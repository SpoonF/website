
class RoutBind{

    constructor(rout,app, _router){
        this.app = app;
        this.rout = rout;
        this.objectRouter = _router;
    }
    createRouter(subRout, func){
        this.objectRouter.prototype.use(subRout, (req, res) => {
            func(req, res, req.params['id']);
        })
    }
    end(){
        this.app.use(this.rout, this.objectRouter);
    };
}
module.exports = RoutBind;