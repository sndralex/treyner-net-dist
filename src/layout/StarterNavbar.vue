<template>
  <navbar position="fixed" type="primary" menu-classes="ml-auto"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
  >
    <template slot-scope="{ toggle, isToggled }">
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        treyner.net Home Site
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Never stop learning...
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <drop-down tag="li" title="Portals">
        <a class="dropdown-item" href="/"><i class="now-ui-icons shopping_box"></i>How-To</a>
        <a class="dropdown-item" href="/"><i class="now-ui-icons users_single-02"></i>Minecraft</a>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
//

export default {
  name: 'main-navbar',
    props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  data: () => ({
      SiteTitle: null,
  }),
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  }
};
/*
EventBus.$on('i-got-clicked', clickCount => {
  console.log(`Oh, that's nice. It's gotten ${clickCount} clicks! :)`)
});*/
</script>

<style scoped></style>
