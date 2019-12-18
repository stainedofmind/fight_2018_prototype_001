var f18_proto = function ()
{
    // Shortcuts
    var _build = rw_scripts.html.build,
        _help = rw_scripts.html.help;

    var _rw = rw_scripts_new.builder;

    // Local Vars
    var _show_debug = false;

    // Base Functions
    function set_debug (debug = true)
    {
        _show_debug = debug;
    }

    function init ()
    {
        page.main();
        page.test();
    }

    // Page Generation
    var page = function ()
    {
        function main ()
        {
            _build.add_text('<div id="f18_header">');
            _build.add_text('    <!-- Fight 2018 Header Section -->');
            _build.add_text('</div>');
            _build.add_text('<hr />');
            _build.add_text('<div id="f18_main">');
            _build.add_text('    <!-- Fight 2018 Main Section -->');
            _build.add_text('</div>');
            _build.add_text('<hr />');
            _build.add_text('<div id="f18_footer">');
            _build.add_text('    <!-- Fight 2018 Footer Section -->');
            _build.add_text('</div>');
            _build.apply_html("f18_body");
        };

        function test ()
        {
            _build.add_text("<h1 id='f18_title'>Fight 2018 Prototype</h1>");
            _build.apply_html("f18_header");

            _build.add_button("but_test", "Run", "f18_proto.page.dumb_test();");
            _build.apply_html("f18_main");

            if (_show_debug)
            {
                _build.add_text("f18_main.js loaded.");
                _build.apply_html("f18_footer");
            }
        };

        function dumb_test ()
        {
            _rw.add_text("Hello, world!");
            _rw.add_line_break();
            _rw.add_button("rw_test", "Test", "alert('derp?');");
            _rw.apply("f18_main");
        };

        function file_test ()
        {
            _build.add_text('<input id="file_test" type="file" multiple><p />');
            _build.add_button("but_read", "Read File", "f18_proto.page.text_display();");
            _build.apply_html("f18_main");
        }

        function welcome ()
        {
            function new_actor (name)
            {
                return ({name, hp: 0});
            }

            function new_pc (name, job)
            {
                return (Object.assign(new_actor(name), {job}));
            }

            var guy = new_pc("Bob", "Guy");
            var gal = new_pc("Jane", "Gal");

            _build.add_text(guy.name + " " + guy.job);
            _build.add_line_break();
            _build.add_text(gal.name + " " + gal.job);
            _build.apply_html("f18_main");
        }

        function text_display ()
        {
            const fs = require('fs');

            var list = document.getElementById('file_test');

            // Added this folder so I didn't keep wrecking things!
            if (!fs.existsSync("output"))
            {
                fs.mkdirSync("output");
            }

            if (!fs.existsSync("backup"))
            {
                fs.mkdirSync("backup");
            }

            var d = new Date();

            var dir = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + "." + d.getMinutes() + "." + d.getSeconds();

            if (!fs.existsSync("backup/" + dir))
            {
                fs.mkdirSync("backup/" + dir);
            }

            for (var x = 0; x < list.files.length; x++)
            {
                var f = list.files[x];
                var _dir = f.path.slice(0, f.path.lastIndexOf('\\') + 1);
                //var text = readTextFile(_dir + f.name);
                var text = fs.readFileSync(_dir + f.name, "utf8");
                var lines = text.split("\n");

                _build.add_text("<h3>" + _dir + f.name + "</h3>");
                _build.add_text("<hr />");

                for (var i = 0; i < lines.length; i++)
                {
                    _build.add_text(lines[i]);
                    _build.add_line_break();

                    // Modify the lines somehow
                    lines[i] = lines[i].toUpperCase();
                }

                _build.add_text("<hr />");

                fs.copyFileSync(_dir + f.name, 'backup/' + dir + '/' + f.name);

                // Recreate files with modified data
                var data = lines.join("\n");

                fs.writeFile(_dir + "output/" + f.name, data, (err) => {

                    // In case of a error throw err.
                    if (err) throw err;
                });
            }

            _build.apply_html("f18_main");
        }

        return {
            main: main,
            test: test,
            welcome: welcome,
            file_test: file_test,
            text_display: text_display,
            dumb_test: dumb_test
        };
    }();

    return {
        init: init,
        page: page,
        set_debug: set_debug
    };
}();
