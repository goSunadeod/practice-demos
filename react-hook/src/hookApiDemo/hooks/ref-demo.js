import React, {
    createRef,
  useImperativeHandle,
  forwardRef
} from 'react';

// class ClassChild extends React.Component {
//     alert() {
//         alert('this is class child')
//     }
//
//     render() {
//         return <span>This.is class child</span>
//     }
// }

function FunctionChild(props, ref) {

    useImperativeHandle(ref, () => ({

        alert() {
            console.log(ref)
            alert('this is function component')
        }
    }))

    return <span>This.is function child</span>
}

const ForWardFunctionClid = forwardRef(FunctionChild);

class Parent extends React.Component {
    constructor() {
        super()
        this.ref= createRef()
    }

    componentDidMount() {
        this.ref.current.alert();
    }

    render() {
        return <ForWardFunctionClid ref={this.ref}/>
    }
}

export default Parent;
