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

    // GOBS
    var gob = function ()
    {
        var unit_test = (name) =>
        {
            let state =
            {
                name,
                test: "Billy"
            }

            let act_greet = (state) =>
            ({
                say_hi: () => {
                    //alert(state.name)
                    return ("Hello, my name is " + state.name);
                }
            })

            let act_yell = (state) =>
            ({
                yell: () => {
                    //alert(state.name)
                    return ("I SAID MY FUCKIN' NAME IS " + state.name.toUpperCase() + "!!!");
                }
            })

            return Object.assign(
                state,
                act_greet(state),
                act_yell(state)
            )
        }

        var actor = (id) =>
        {
            let state =
            {
                id,
                name: "",
                lv: 0,
                mhp: 0,
                chp: 0,
                mmp: 0,
                cmp: 0,
                mdp: 0, // Max Defense Points
                cdp: 0,
                str: 0,
                def: 0,
                agi: 0,
                int: 0,
                magic: [],
                skill: [],
                equip: { m_hand: "", o_hand: "", head: "", body: "", acc_1: "", acc_2: "" }
            }

            let gob_test = (state) =>
            ({
                get_id: () => {
                    //alert(state.id)
                    return ("ID: " + state.id);
                }
            })

            // Get data here
            return Object.assign(
                state,
                gob_test(state)
            )
        }

        var spell = (id) =>
        {
            let state =
            {
                id,
                name: "",
                type: ""
            }

            return Object.assign(
                state
            }
        }

        return {
            unit_test: unit_test,
            actor: actor,
            spell: spell
        };
    }();

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

            _build.add_button("but_test", "Run", "f18_proto.page.welcome();");
            _build.apply_html("f18_main");

            if (_show_debug)
            {
                _build.add_text("f18_main.js loaded.");
                _build.apply_html("f18_footer");
            }
        };

        function welcome ()
        {
            var act_cloud = gob.actor("Cloud Strife");
            var test = f18_proto.gob.unit_test("Bob");

            _build.add_text(test.say_hi());
            _build.add_line_break();
            _build.add_text(act_cloud.get_id());
            _build.add_line_break();
            _build.add_text(act_cloud.equip.m_hand);
            _build.apply_html("f18_main");
        }

        return {
            main: main,
            test: test,
            welcome: welcome
        };
    }();

    return {
        init: init,
        page: page,
        set_debug: set_debug,
        gob: gob
    };
}();
