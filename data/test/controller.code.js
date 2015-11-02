if (typeof(addon) != 'undefined') addon.port.on("execCode", function(code) {eval(code); } );
if (typeof(self) != 'undefined') self.port.on("execCode", function(code) {eval(code); } );