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
		function elem_get (_id)
		{
			return (document.getElementById(_id));
		};

		function elem_clear (_id)
		{
			var _elem = elem_get(_id);

			while (_elem.firstChild)
			{
				_elem.removeChild(_elem.firstChild);
			};
		};

		return {
			elem_get: elem_get,
			elem_clear: elem_clear
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

		function add_generic (_type)
		{
			var _elem = document.createElement(_type),
				i = 1;

			while (i < arguments.length - 1)
			{
				if (arguments[i] == "innerHTML")
				{
					i++;

					_elem.innerHTML = arguments[i++];
				}
				else
				{
					var _attr = document.createAttribute(arguments[i++]);

					_attr.value = arguments[i++];

					_elem.setAttributeNode(_attr);
				}
			}

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

		function add_br ()
		{
			var _elem = document.createElement("br");

			__doc.appendChild(_elem);
		};

		function add_hr ()
		{
			var _elem = document.createElement("hr");

			__doc.appendChild(_elem);
		};

		function apply (_id)
		{
			var _elem = html.elem_get(_id);

			html.elem_clear(_id);

			_elem.appendChild(__doc);
			clear ();
		};

		return {
			clear: clear,
			add_text: add_text,
			add_generic: add_generic,
			add_button: add_button,
			add_br: add_br,
			add_hr: add_hr,
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
