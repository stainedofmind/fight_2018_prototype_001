var rw_scripts_old = function ()
{
	var text = "Wobble";

	// Unclassified functions
	function test ()
	{
		return (text);
	};

	function is_array (data)
	{
		return (typeof members === 'object' && typeof members.slice === 'function');
	};

	var math = function ()
	{
		function rnd (min, max)
		{
			return (Math.floor(Math.random() * (max - min + 1)) + min);
		};

		return {
			rnd: rnd
		};
	}();

	var html = function ()
	{
		var build = function ()
		{
			var html = "";

			function apply_html (element_id)
			{
				document.getElementById(element_id).innerHTML = html;
				html = "";
			}

			function get_html (clear = true)
			{
				var _html = html;
				if (clear)
				{
					html = "";
				}
				return (_html);
			};

			function add_text (text)
			{
				html += text;
			};

			function add_button (id, text, on_click)
			{
				html += '<input id = "' + id + '" type = "button" value = "' + text + '" onclick = "' + on_click + '" />';
			};

			function add_number_box (id, min, max, value)
			{
				html += '<input id = "' + id + '" type = "number" min = "' + min + '" max = "' + max +'" value = "' + value + '" />';
			};

			function add_check_box (id, check = false)
			{
				var checked = "";

				if (check)
				{
					checked = " checked ";
				}

				html += '<input id = "' + id + '" type = "checkbox"' + checked + '/>';
			};

			function add_line_break ()
			{
				html += "<br />";
			};

			function clear_html ()
			{
				html = "";
			};

			return {
				get_html: get_html,
				add_text: add_text,
				add_button: add_button,
				clear_html: clear_html,
				add_number_box: add_number_box,
				add_line_break: add_line_break,
				add_check_box: add_check_box,
				apply_html: apply_html
			};
		}();

		var help = function ()
		{
			function set_html (element_id, html)
			{
    			document.getElementById(element_id).innerHTML = html;
			};

			function get_elem (element_id, html)
			{
    			return (document.getElementById(element_id));
			};

			function clear_html (element_id)
			{
    			document.getElementById(element_id).innerHTML = "";
			};
			return {
				set_html: set_html,
				get_elem: get_elem,
				clear_html: clear_html
			};
		}();

		return {
			build: build,
			help: help
		};
	}();

	return {
		test: test(),
		is_array: is_array,
		math: math,
		html: html
	};
}();
