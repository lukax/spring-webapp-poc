define(["require", "exports"], function(require, exports) {
    (function (util) {
        util.PackageLoader = function() {
            this.cb = Math.random(0, 100000000000);
            this.current = 0;
            this.batches = [];

            // Load kicks off the entire loading process.
            this.load = function(config, loadMap, onload) {
                var scope = this;
                for(label in loadMap) {
                    scope.batches.push(new util.PackageBatch(label, loadMap[label]));
                }
                scope.onload = onload;
                if (config.jQuery) {
                    requirejs([
                        config.jQuery
                    ], function() {
                        util.PackagePreloader.instance.init(config);
                        scope._subLoad();
                    });
                } else {
                    console.error("PackageLoader.load: First argument (config object) requires 'preloader' and 'jQuery' source path properties, or the function cannot run.");
                }
            };

            // This loads the current (not-yet-loaded) batch of packages.
            this._subLoad = function() {
                util.PackagePreloader.instance.update();
                var scope = this;
                if (this.current<this.batches.length) {
                    this.batches[this.current].require(function() {
                        scope.current++;
                        scope._subLoad();
                    });
                } else {
                    $(function() {
                        util.PackagePreloader.instance.complete(scope.onload);
                    });
                }
            };

            // Returns the current package. The point of this is to be a neat public function.
            this.getCurrentPackage = function() {
                return this.batches[this.current];
            };
        };

        // This is currently automatically a singleton, until a better method of defining the PackageLoader/PackagePreloader relationship is defined.
        util.PackageLoader.instance = new util.PackageLoader();

        // Handles a single 'batch' of packages.
        util.PackageBatch = function(label, batch) {
            this.label = label;
            this.batch = batch;

            this.require = function(complete) {
                requirejs(this.batch, complete);
            };

        };


        util.PackagePreloader = function() {
            this.el = document.createElement('div');
            this.jqBar;

            // Initially called with PackageLoader config.
            this.init = function(config) {
                if (config.domParent) {
                    $(this.el).appendTo(config.domParent);
                    this.jqBar = $('<div>')
                        .css('width',0)
                        .addClass("progressbar-progress")
                    ;

                    this.$loadList = $('<ul>').addClass('package-listing').css('width', '600px').css('margin', '0 auto').html("Carregando...");
                    $(this.el).append(
                        $('<div>').append(
                            $('<div>')
                                .css('background-color', 'transparent')
                                .append(this.jqBar)
                                .addClass("progressbar-inner")
                        ).addClass("progressbar")
                    ).append(this.$loadList);
                } else {
                    console.error("PackagePreloader.init: Config object requires 'domParent' property. This property must contain the parent dom object to which the progress bar will be attached. Otherwise the function cannot run.");
                }
            };

            // Returns the fraction current progress.
            this.interpretCurrent = function() {
                return util.PackageLoader.instance.current/util.PackageLoader.instance.batches.length;
            };

            // Called each time a batch is loaded and the current batch to be loaded is updated.
            this.update = function() {
                this.jqBar.css('width', (this.interpretCurrent()*100)+'%');
                var pkg = util.PackageLoader.instance.getCurrentPackage();
                if (pkg) {
                    this.$loadList.append($('<li>').html("Loaded "+pkg.label));
                }
            };

            // Fades out when done.
            this.complete = function(onFadeOut) {
                $(this.el).fadeOut({complete:onFadeOut});
            };
        };
        util.PackagePreloader.instance = new util.PackagePreloader();


    })(exports.util || (exports.util = {}));
});
