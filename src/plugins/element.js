import Vue from 'vue'
import { Button,Header,Footer,Main,Container,Row,Col,MenuItem,Menu,Submenu,Carousel,CarouselItem,Form,FormItem,Input,Aside,Main,Container} from 'element-ui'


const components = {Button,Header,Footer,Main,Container,Row,Col,MenuItem,Menu,Submenu,Carousel,CarouselItem,Form,FormItem,Input,Aside,Main,Container}
Object.values(components).forEach(component => {
    Vue.use(component)
})
// Object.entries(components).forEach(([key,value]) => {
//     Vue.use(value)
// })

