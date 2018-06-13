//default map template
import nav_template from '../templates/nav_bar.html'
import { Component } from './components';
import { toggleElementDisplay } from './domUtils';
/**
 * nav_bar Component
 * Render and control map layer control
 */
export class nav_bar extends Component {
  constructor (placeholderId, props) {
    super(placeholderId, props, nav_template);

    /*
    * define valid nav headings
    * Todo better way to handle this from structure of app maybe
    */
    this.navs = ['main_nav_index', 'main_nav_about', 'main_nav_download']
    console.log('active1',props.activeNav)
    /*
    * change active div Find a
    * Todo better way to handle this.
    */
    if(props){
      if(props.activeNav){
        this.changeActive(this.navs, props.activeNav)
      } else {
        this.changeActive(this.navs, "")
      }
    } else {
      this.changeActive(this.navs, "")
    }
  }

  //change active nav bar heading
  changeActive(navs, activeNav){
    console.log('active', activeNav)
    //iterate all navs and make each not active
    navs.map ( (nav) => {

      //make all navs not active if the html element exists
      let el = document.querySelector(`[ref="${nav}"]`)
      console.log(`[ref="${activeNav}"]`)
      if(el){
          el.className = el.className.replace(' active','')
      }

      el.addEventListener('click', (e) => {
        const thisEle = this;
        toggleElementDisplay(name, navs);
      })

    })

    //make clicked nav active if html element exists
    const activeEl = document.querySelector(`[ref="main_nav_${activeNav}"]`);
    this.activeNav = activeNav;
    if(activeEl){
      activeEl.className = activeEl.className += ' active';
    }
  }

}
