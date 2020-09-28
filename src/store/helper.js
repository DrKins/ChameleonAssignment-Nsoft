const helper = {
        // Function that finds index of active user in store.
        ActiveUser: function(base){
            let index = undefined;
            base.forEach(element => {
                if(element.logged === true) index = base.indexOf(element);     
            });
            return index;
        },
        //Function that finds card via its id in lables array (card array)
        findIndex: function (base,payload){
            let index = this.ActiveUser(base);
            return base[index].labels.findIndex(a => a.id === payload.id);
        },
        //Function that updates user.logged status when loggin in.
        ActiveUserChange: function(base,payload){
            let x = base.findIndex(a=> a.username === payload.username);
            base[x].logged = true;
        },
    }
export {
    helper
}