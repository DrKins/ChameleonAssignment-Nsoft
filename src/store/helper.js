const helper = {
    ActiveUser: function(base){
        let index = undefined;
        base.forEach(element => {
            if(element.logged === true) index = base.indexOf(element);     
        });
        return index;
    },
    findIndex: function (base,payload){
        let index = this.ActiveUser(base);
        return base[index].labels.findIndex(a => a.id === payload.id);
    },
    ActiveUserChange: function(base,payload){
        base.forEach(element => {
            if(element.logged) element.logged = false;
        })
        let x =base.findIndex(a=> a.username === payload.username);
        base[x].logged = true;
    }
    }
export {
    helper
}