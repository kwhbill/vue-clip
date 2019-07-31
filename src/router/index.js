import {DemoPage} from "src/pages"
export default  {
    routes: [
        {path: "/", redirect: {name: 'demo'}},
        {name: 'demo', path: '/demo', component: DemoPage},
    ]
}
