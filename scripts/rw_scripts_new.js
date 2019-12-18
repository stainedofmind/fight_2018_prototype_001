var rw_scripts_new = function ()
{
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
		function get_elem (element_id)
		{
			return (document.getElementById(element_id));
		};

		return {
			get_elem: get_elem
		};
	}();

	var builder = function ()
	{
		var __doc = document.createDocumentFragment();

		function clear ()
		{
			__doc = document.createDocumentFragment();
		};

		function add_text (_text)
		{
			var _elem = document.createTextNode(_text);
			__doc.appendChild(_elem);
		};

		function add_button (_id, _text, _on_click)
		{
			var _elem = document.createElement("input"),
				_a_id = document.createAttribute("id"),
				_a_type = document.createAttribute("type"),
				_a_text = document.createAttribute("value"),
				_a_on_click = document.createAttribute("onclick");

			_a_id.value = _id;
			_a_type.value = "button";
			_a_text.value = _text;
			_a_on_click.value = _on_click;

			_elem.setAttributeNode(_a_id);
			_elem.setAttributeNode(_a_type);
			_elem.setAttributeNode(_a_text);
			_elem.setAttributeNode(_a_on_click);

			__doc.appendChild(_elem);
		};

		function add_line_break ()
		{
			var _elem = document.createElement("br");

			__doc.appendChild(_elem);
		};

		function apply (_id)
		{
			var _elem = html.get_elem(_id);

			document.body.replaceChild(__doc, _elem);
			clear ();
		};

		return {
			clear: clear,
			add_text: add_text,
			add_button: add_button,
			add_line_break: add_line_break,
			apply: apply
		};
	}();

	return {
		is_array: is_array,
		math: math,
		html: html,
		builder: builder
	};
}();
