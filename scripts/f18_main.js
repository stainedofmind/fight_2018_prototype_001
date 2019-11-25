var f18_proto = function ()
{
    // Shortcuts
    var _build = rw_scripts.html.build,
        _help = rw_scripts.html.help;

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

    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        var allText = "";

        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    allText = rawFile.responseText;
                    //alert(allText);
                }
            }
        }
        rawFile.send(null);
        return (allText);
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

            _build.add_button("but_test", "Run", "f18_proto.page.file_test();");
            _build.apply_html("f18_main");

            if (_show_debug)
            {
                _build.add_text("f18_main.js loaded.");
                _build.apply_html("f18_footer");
            }
        };

        function file_test ()
        {
            _build.add_text('<input id="file_test" type="file">');
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
            var name = document.getElementById('file_test');
            var text = readTextFile(name.files.item(0).name);
            var textByLine = text.split("\n");

            for (var i = 0; i < textByLine.length; i++)
            {
                _build.add_text(textByLine[i]);
                _build.add_text("<br />");
            }

            const fs = require('fs');

            // Data which will write in a file.
            //let data = "Learning how to write in a file."

            // Write data in 'Output.txt' .
            //fs.writeFile('Output.txt', data, (err) => {

                // In case of a error throw err.
                //if (err) throw err;
            //})

            if (!fs.existsSync("backup"))
            {
                fs.mkdirSync("backup");
            }

            if (!fs.existsSync("backup/derp"))
            {
                fs.mkdirSync("backup/derp");
            }

            fs.copyFileSync(name.files.item(0).name, 'backup/derp/' + name.files.item(0).name);

            _build.apply_html("f18_main");
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
