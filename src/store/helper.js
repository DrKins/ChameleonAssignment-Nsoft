const helper = {
    UserIndex: function(base){
        let index = undefined;
        base.forEach(element => {
            if(element.logged === true) index = base.indexOf(element);     
        });
        return index;
    },
    IncrementIDs: function (base){
        let index = this.UserIndex(base);
        base[index].labels.forEach( element => {
             element.id++;
        });
        }
    }

export {
    helper
}