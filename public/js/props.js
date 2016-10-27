   function checks (propsIn , propsDefault)
    {
        for ( var key in propsDefault )
        {
            if ( propsIn[key] == undefined || propsIn[key] == null)
            {
                propsIn[key] = propsDefault[key];
            }
        }
        return propsIn;
    }