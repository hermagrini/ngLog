(function () {
  "use strict";
  angular
      .module('ngLogModule')
      .factory('ngLogLevel', ngLogLevel);

  function ngLogLevel() {

    Level.prototype = {
      isEqualTo               : isEqualTo,
      isGreaterThan           : isGreaterThan,
      isGreaterThanOrEqualTo  : isGreaterThanOrEqualTo,
      isLowerThan             : isLowerThan,
      isLowerThanOrEqualTo    : isLowerThanOrEqualTo,
      toLevel                 : toLevel,
      toString                : toString
    };

    var ngLogLevel = {
      VERBOSE : new Level(Number.MIN_VALUE, "verbose"),
      LOG     : new Level(5000, "log"),
      DEBUG   : new Level(10000, "debug"),
      INFO    : new Level(20000, "info"),
      WARN    : new Level(30000, "warn"),
      ERROR   : new Level(40000, "error"),
      SILENT  : new Level(Number.MAX_VALUE, "silent")
    };

    return ngLogLevel;

    function Level(level, levelStr) {
      this.level = level;
      this.levelStr = levelStr;
    }

    function isEqualTo(otherLevel) {
      return this.level === toLevel(otherLevel).level;
    }

    function isGreaterThan(otherLevel) {
      return this.level > toLevel(otherLevel).level;
    }

    function isGreaterThanOrEqualTo(otherLevel) {
      return this.level >= toLevel(otherLevel).level;
    }

    function isLowerThan(otherLevel) {
      return this.level < toLevel(otherLevel).level;
    }

    function isLowerThanOrEqualTo(otherLevel) {
      return this.level <= toLevel(otherLevel).level;
    }

    function toLevel(levelString) {

      if (!levelString) {
        return ngLogLevel.VERBOSE;
      }

      if (typeof levelString == "string") {
        var s = levelString.toUpperCase();
        if (ngLogLevel[s]) {
          return ngLogLevel[s];
        } else {
          return ngLogLevel.VERBOSE;
        }
      }

      return toLevel(levelString.toString());
    }

    function toString() {
      return this.levelStr;
    }

  }
})();
