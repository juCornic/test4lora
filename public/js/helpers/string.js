define(function (require)
{
	function fromHexa(hexValue)
	{
		var str = '';

		for (var i = 0; i < hexValue.length; i += 2)
		{
			str += String.fromCharCode(parseInt(hexValue.substr(i, 2), 16));
		}

		return str;
	}

	return {
		fromHexa: fromHexa
	}
});
