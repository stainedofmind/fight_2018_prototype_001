var f18_proto = function ()
{
    var _build = rw_scripts.builder;

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
            _build.add_generic("div", "id", "f18_header", "innerHTML", "    <!-- Fight 2018 Header Section -->");
            _build.add_hr();
            _build.add_generic("div", "id", "f18_main", "innerHTML", "    <!-- Fight 2018 Main Section -->");
            _build.add_hr();
            _build.add_generic("div", "id", "f18_footer", "innerHTML", "    <!-- Fight 2018 Footer Section -->");
            _build.add_hr();
            _build.apply("f18_body");
        };

        function test ()
        {
            _build.add_generic("h1", "id", "f18_title", "innerHTML", "Fight 2018 Prototype");
            _build.apply("f18_header");

            _build.add_button("but_test", "Run", "f18_proto.page.file_test();");
            _build.apply("f18_main");

            if (_show_debug)
            {
                _build.add_text("f18_main.js loaded.");
                _build.apply("f18_footer");
            }
        };

        function file_test ()
        {
            var _file = _build.add_generic("input", "id", "file_test", "type", "file");

            _file.multiple = true;

            _build.add_generic("p");
            _build.add_button("but_read", "Read File", "f18_proto.page.text_display();");
            _build.apply("f18_main");
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
                var text = fs.readFileSync(_dir + f.name, "utf8");
                var lines = text.split("\n");

                _build.add_generic("h3", "innerHTML", _dir + f.name);
                _build.add_hr();

                for (var i = 0; i < lines.length; i++)
                {
                    _build.add_text(lines[i]);
                    _build.add_br();

                    // Modify the lines somehow
                    lines[i] = lines[i].toUpperCase();
                }

                _build.add_hr();

                fs.copyFileSync(_dir + f.name, 'backup/' + dir + '/' + f.name);

                // Recreate files with modified data
                var data = lines.join("\n");

                fs.writeFile(_dir + "output/" + f.name, data, (err) => {

                    // In case of a error throw err.
                    if (err) throw err;
                });
            }

            _build.apply("f18_main");
        }

        return {
            main: main,
            test: test,
            welcome: welcome,
            file_test: file_test,
            text_display: text_display
        };
    }();

    return {
        init: init,
        page: page,
        set_debug: set_debug
    };
}();
