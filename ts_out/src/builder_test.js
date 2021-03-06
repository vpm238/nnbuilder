describe("Neural Net Builder Tests > ", function () {
    function create_sample_user_response(nt) {
        var user_response = get_user_response_for_type(nt);
        switch (NNComponentType[nt]) {
            case NNComponentType[NNComponentType.Convolution]:
                user_response['num_output'] = 256;
                user_response['pad'] = 0;
                user_response['kernel_size'] = 3;
                break;
            case NNComponentType[NNComponentType.Pooling]:
                user_response['pool_type'] = 'MAX';
                user_response['kernel_size'] = 3;
                user_response['stride'] = 1;
                break;
            case NNComponentType[NNComponentType.FullyConnected]:
                user_response['num_output'] = 256;
                break;
            // case NNComponentType[NNComponentType.DropOut]:
            //   user_response['dropout_ratio'] = 0.5;
            //   break;
            // case NNComponentType[NNComponentType.ReLU]:
            //   break;
            case NNComponentType[NNComponentType.Softmax]:
                break;
        }
        return user_response;
    }
    describe("Initialization and tests > ", function () {
        var root;
        var net;
        beforeEach(angular.mock.module("myApp"));
        beforeEach(inject(function ($rootScope, $templateCache, $log) {
            root = $rootScope;
            $log.info("inject");
        }));
        it('rootScope should be defined', inject(function ($rootScope, $templateCache, $log) {
            net = root['common'];
            expect(net).toBeDefined();
        }));
        it('should contain empty neural net', inject(function ($rootScope, $templateCache, $log) {
            expect(net.getCurrentComponents().length).toBe(0);
        }));
        it('available components to be 4', function () {
            expect(net.getAvailableComponentTypes().length).toBe(4);
        });
        it('add 1 component', function () {
            net.addToNN(NNComponentType.Convolution);
            expect(net.getCurrentComponents().length).toBe(1);
        });
        it('add 2 components', function () {
            net.addToNN(NNComponentType.Convolution);
            net.addToNN(NNComponentType.Convolution);
            expect(net.getCurrentComponents().length).toBe(3);
        });
        it('remove 2 components', function () {
            net.removeFromNN(net.getCurrentComponents()[1].id);
            net.removeFromNN(net.getCurrentComponents()[0].id);
            expect(net.getCurrentComponents().length).toBe(1);
        });
        it('should add a convolutional component and checkout', function () {
            net.addToNN(NNComponentType.Convolution);
            var comp = net.getCurrentComponents()[0];
            var usr_response = create_sample_user_response(NNComponentType.Convolution);
            net.saveNNCProps(comp.id, usr_response);
            var fvs = net.getfielditems(comp.id);
            //console.log('items:' + JSON.stringify(fvs));
            for (var _i = 0, fvs_1 = fvs; _i < fvs_1.length; _i++) {
                var it_1 = fvs_1[_i];
                if (it_1.fieldname == 'num_output') {
                    expect(it_1.fieldvalue).toBe(256);
                }
                if (it_1.fieldname == 'pad') {
                    expect(it_1.fieldvalue).toBe(0);
                }
                if (it_1.fieldname == 'kernel_size') {
                    expect(it_1.fieldvalue).toBe(3);
                }
            }
        });
        it('remove all components', function () {
            net.removeAllComponents();
            expect(net.getCurrentComponents().length).toBe(0);
        });
        it('should add a convolutional component and checkout by fieldvalues', function () {
            net.addToNN(NNComponentType.Convolution);
            var comp = net.getCurrentComponents()[0];
            var usr_response = create_sample_user_response(NNComponentType.Convolution);
            net.saveNNCProps(comp.id, usr_response);
            var fvs = net.getfieldvaluesbyname(comp.id);
            //console.log('by name:' + JSON.stringify(fvs));
            expect(fvs['num_output']).toBe(256);
            expect(fvs['pad']).toBe(0);
            expect(fvs['kernel_size']).toBe(3);
        });
    });
});
