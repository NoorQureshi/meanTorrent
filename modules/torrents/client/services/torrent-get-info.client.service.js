(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('torrents.services')
    .factory('TorrentGetInfoServices', TorrentGetInfoServices);

  TorrentGetInfoServices.$inject = ['MeanTorrentConfig', '$state'];

  function TorrentGetInfoServices(MeanTorrentConfig, $state) {
    var voteTitleConfig = MeanTorrentConfig.meanTorrentConfig.voteTitle;
    var tmdbConfig = MeanTorrentConfig.meanTorrentConfig.tmdbConfig;
    var torrentSalesType = MeanTorrentConfig.meanTorrentConfig.torrentSalesType;

    var service = {
      getTorrentTitle: getTorrentTitle,
      getTorrentOriginalTitle: getTorrentOriginalTitle,
      getTorrentDoubleTitle: getTorrentDoubleTitle,
      getTorrentCustomTitle: getTorrentCustomTitle,
      getTorrentCustomSubTitle: getTorrentCustomSubTitle,
      getFormattedResourceTitle: getFormattedResourceTitle,
      getTorrentListImage: getTorrentListImage,
      getTorrentListTopImage: getTorrentListTopImage,
      getTorrentTopOneImage: getTorrentTopOneImage,
      getTorrentBackdropImage: getTorrentBackdropImage,
      getVoteTitle: getVoteTitle,
      getMovieDirector: getMovieDirector,
      getTorrentLanguage: getTorrentLanguage,
      getTorrentOverview: getTorrentOverview,

      openTorrentDetailInfo: openTorrentDetailInfo,
      getTorrentSaleTypeDesc: getTorrentSaleTypeDesc,
      getTorrentSaleTypeDescByValue: getTorrentSaleTypeDescByValue
    };

    return service;


    /**
     * getTorrentTitle
     * @param item
     * @returns {string}
     */
    function getTorrentTitle(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        switch (item.torrent_type) {
          case 'movie':
            result = item.resource_detail_info.title;
            break;
          case 'tvserial':
            result = item.resource_detail_info.name;
            break;
          default:
            result = item.resource_detail_info.title;
            break;
        }
      }
      return result;
    }

    /**
     * getTorrentOriginalTitle
     * @param item
     * @returns {string}
     */
    function getTorrentOriginalTitle(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        switch (item.torrent_type) {
          case 'movie':
            result = item.resource_detail_info.original_title;
            break;
          case 'tvserial':
            result = item.resource_detail_info.original_name;
            break;
        }
      }
      return result;
    }

    /**
     * getTorrentDoubleTitle
     * @param item
     * @returns {string}
     */
    function getTorrentDoubleTitle(item) {
      var t = getTorrentTitle(item);
      var ori = getTorrentOriginalTitle(item);

      if (!ori) {
        return t;
      } else {
        return ori === t ? t : t + ' / ' + ori;
      }
    }

    /**
     * getTorrentCustomTitle
     * @param item
     * @returns {*}
     */
    function getTorrentCustomTitle(item) {
      if (item.resource_detail_info.custom_title) {
        return getFormattedResourceTitle(item.resource_detail_info.custom_title);
      } else {
        return getFormattedResourceTitle(item.torrent_filename);
      }
    }

    /**
     * getTorrentCustomSubTitle
     * @param item
     * @returns {*}
     */
    function getTorrentCustomSubTitle(item) {
      if (item.resource_detail_info.custom_subtitle) {
        return item.resource_detail_info.custom_subtitle;
      } else if (item.resource_detail_info.subtitle) {
        return item.resource_detail_info.subtitle;
      } else {
        return getTorrentDoubleTitle(item);
      }
    }

    /**
     * getFormattedResourceTitle
     * @param title
     * @returns {*}
     */
    function getFormattedResourceTitle(title) {
      if (title) {
        var reg = /\{([a-zA-Z0-9\_\-\.\s]){2,10}\}[\.|\s]*|\[([a-zA-Z0-9\_\-\.\s]){2,10}\][\.|\s]*/gi;
        title = title.replace(reg, '');
        title = title.replace(/.torrent/g, '');
        title = title.replace(/[\.|\s]*mp4$/i, '');
        title = title.replace(/[\.|\s]*mkv$/i, '');

        // var re = /((?:^|\D)\d\.\d(?=\D|$))|\./g;
        var re = /[0-9]\.[0-9]\b|(\.)/g;
        var repl = title.replace(re, function ($0, $1) {
          // return ($1 ? $1.replace(/^\./, ' ') : ' ');
          return $1 === '.' ? ' ' : $0;
        });

        return repl;
      } else {
        return '';
      }
    }

    /**
     * getTorrentListImage
     * @param item
     * @returns {string}
     */
    function getTorrentListImage(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        switch (item.torrent_type) {
          case 'movie':
          case 'tvserial':
            result = tmdbConfig.posterListBaseUrl + item.resource_detail_info.poster_path;
            break;
          default:
            result = '/modules/torrents/client/uploads/cover/' + (item.resource_detail_info.cover_crop ? 'crop/' : '') + item.resource_detail_info.cover;
            break;
        }
      }
      return result;
    }

    /**
     * getTorrentListTopImage
     * @param item
     * @returns {string}
     */
    function getTorrentListTopImage(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        switch (item.torrent_type) {
          case 'movie':
          case 'tvserial':
            result = tmdbConfig.posterImgBaseUrl + item.resource_detail_info.poster_path;
            break;
          default:
            result = '/modules/torrents/client/uploads/cover/' + (item.resource_detail_info.cover_crop ? 'crop/' : '') + item.resource_detail_info.cover;
            break;
        }
      }
      return result;
    }

    /**
     * getTorrentTopOneImage
     * @param item
     * @returns {string}
     */
    function getTorrentTopOneImage(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        switch (item.torrent_type) {
          case 'movie':
          case 'tvserial':
            result = tmdbConfig.posterImgBaseUrl + item.resource_detail_info.poster_path;
            break;
          default:
            result = '/modules/torrents/client/uploads/cover/' + (item.resource_detail_info.cover_crop ? 'crop/' : '') + item.resource_detail_info.cover;
            break;
        }
      }
      return result;
    }

    /**
     * getTorrentBackdropImage
     * @param item
     * @returns {string}
     */
    function getTorrentBackdropImage(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        switch (item.torrent_type) {
          case 'movie':
          case 'tvserial':
            result = tmdbConfig.backdropImgBaseUrl + item.resource_detail_info.backdrop_path;
            break;
          default:
            result = '/modules/torrents/client/uploads/cover/' + item.resource_detail_info.cover;
            break;
        }
      }
      return result;
    }

    /**
     * getVoteTitle
     * @param item
     * @returns {string}
     */
    function getVoteTitle(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        switch (item.torrent_type) {
          case 'movie':
          case 'tvserial':
            result = voteTitleConfig.imdb;
            break;
          default :
            result = voteTitleConfig.mt;
            break;
        }
      } else {
        result = voteTitleConfig.mt;
      }
      return result;
    }

    /**
     * getMovieDirector
     * @param item
     * @returns {n}
     */
    function getMovieDirector(item) {
      var result = null;

      if (item && item.resource_detail_info && item.resource_detail_info.credits) {
        angular.forEach(item.resource_detail_info.credits.crew, function (sitem) {
          if (sitem.job === 'Director') {
            result = sitem.name;
          }
        });
      }
      return result;
    }

    /**
     * getTorrentLanguage
     * @param item
     * @returns {*}
     */
    function getTorrentLanguage(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        result = item.resource_detail_info.original_language;
      }
      return result;
    }

    /**
     * getTorrentOverview
     * @param item
     * @returns {*}
     */
    function getTorrentOverview(item) {
      var result = null;

      if (item && item.resource_detail_info) {
        result = item.resource_detail_info.overview || item.resource_detail_info.detail || null;
      }
      return result;
    }

    /**
     * openTorrentDetailInfo
     * @param id
     */
    function openTorrentDetailInfo(id) {
      $state.go('torrents.view', {torrentId: id});
    }

    /**
     * getTorrentSaleTypeDesc
     */
    function getTorrentSaleTypeDesc(item) {
      var desc = '';

      angular.forEach(torrentSalesType.value, function (st) {
        if (st.name === item.torrent_sale_status) {
          desc = st.desc;
        }
      });
      return desc;
    }

    /**
     * getTorrentSaleTypeDescByValue
     */
    function getTorrentSaleTypeDescByValue(v) {
      var desc = '';

      angular.forEach(torrentSalesType.value, function (st) {
        if (st.name === v) {
          desc = st.desc;
        }
      });
      return desc;
    }

  }
}());
