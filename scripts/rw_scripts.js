var rw_scripts = function ()
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

		function elem_clear (_elem)
		{
			while (_elem.firstChild)
			{
				_elem.removeChild(_elem.firstChild);
			};
		};

		function elem_set_attrs (_elem)
		{
			var i = 1;

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
		};

		return {
			elem_get: elem_get,
			elem_clear: elem_clear,
			elem_set_attrs: elem_set_attrs
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

			return (_elem);
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

			return (_elem);
		};

		function add_button (_id, _text, _on_click)
		{
			var _elem = document.createElement("input");

			html.elem_set_attrs(_elem, "id", _id, "type", "button", "value", _text, "onclick", _on_click);

			__doc.appendChild(_elem);

			return (_elem);
		};

		function add_num_box (_id, _val, _min, _max)
		{
			var _elem = document.createElement("input");

			html.elem_set_attrs(_elem, "id", _id, "type", "number", "value", _val, "min", _min, "max", _max);

			__doc.appendChild(_elem);

			return (_elem);
		};

		function add_check_box (_id, _text = "", _checked = false)
		{
			var _elem = document.createElement("input"),
				_txt = document.createTextNode(_text);

			html.elem_set_attrs(_elem, "id", _id, "type", "checkbox");

			_elem.checked = _checked;

			__doc.appendChild(_elem);
			__doc.appendChild(_txt);

			return (_elem);
		};

		function add_br ()
		{
			var _elem = document.createElement("br");

			__doc.appendChild(_elem);

			return (_elem);
		};

		function add_hr ()
		{
			var _elem = document.createElement("hr");

			__doc.appendChild(_elem);

			return (_elem);
		};

		function apply (_id)
		{
			var _elem = html.elem_get(_id);

			html.elem_clear(_elem);

			_elem.appendChild(__doc);

			clear();
		};

		return {
			clear: clear,
			add_text: add_text,
			add_generic: add_generic,
			add_button: add_button,
			add_num_box: add_num_box,
			add_check_box: add_check_box,
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
