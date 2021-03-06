(function () {
  'use strict';

  angular
    .module('albums')
    .controller('AlbumController', AlbumController);

  AlbumController.$inject = ['$scope', '$translate', 'MeanTorrentConfig', 'AlbumsService', 'DebugConsoleService', '$filter', 'TorrentGetInfoServices', '$timeout'];

  function AlbumController($scope, $translate, MeanTorrentConfig, AlbumsService, mtDebug, $filter, TorrentGetInfoServices, $timeout) {
    var vm = this;
    vm.TGI = TorrentGetInfoServices;
    vm.appConfig = MeanTorrentConfig.meanTorrentConfig.app;
    vm.torrentTypeConfig = MeanTorrentConfig.meanTorrentConfig.torrentType;
    vm.tmdbConfig = MeanTorrentConfig.meanTorrentConfig.tmdbConfig;

    /**
     * $scope.$watch($('.albums-item').width())
     */
    $scope.$watch(function () {
      return $('.albums-item').width();
    }, function (newVal, oldVal) {
      if (newVal) {
        var elements = $('.albums-item img');

        angular.forEach(elements, function (e) {
          var element = angular.element(e);

          element.parent().height(element.parent().width() / 1.772);

          if (element.height() > element.parent().height()) {
            element.css('margin-top', -(element.height() - element.parent().height()) / 2);
          } else {
            element.css('margin-top', (element.parent().height() - element.height()) / 2);
          }
        });
      }
    });

    /**
     * getAlbumsList
     */
    vm.getAlbumsList = function () {
      AlbumsService.query({}, function (data) {
        vm.albumsList = data;
        vm.getAlbumsTypeList(data);
        mtDebug.info(data);
      });
    };

    /**
     * getAlbumsTypeList
     * @param data
     */
    vm.getAlbumsTypeList = function (data) {
      var t = $filter('groupBy')(data, 'type');

      var tList = [];
      angular.forEach(t, function (i, k) {
        tList.push(k);
      });

      vm.albumsTypeList = [];
      angular.forEach(vm.torrentTypeConfig.value, function (ct) {
        if (tList.includes(ct.value)) {
          vm.albumsTypeList.push({
            type: ct.value,
            idx: ct.position,
            count: getTorrentsCount(t[ct.value])
          });
        }
      });

      mtDebug.info(vm.albumsTypeList);

      function getTorrentsCount(ct) {
        var i = 0;
        angular.forEach(ct, function (titem) {
          i = i + titem.torrents.length;
        });
        return i;
      }
    };

    /**
     * getAlbumBackdropImage
     * @param item
     * @returns {string}
     */
    vm.getAlbumBackdropImage = function (item) {
      var result = null;

      if (item.backdrop_path) {
        result = vm.tmdbConfig.backdropImgBaseUrl + item.backdrop_path;
      } else if (item.cover) {
        result = '/modules/torrents/client/uploads/cover/' + item.cover;
      }
      return result;
    };
  }
}());
