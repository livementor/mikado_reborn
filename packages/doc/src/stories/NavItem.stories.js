import { MkrNavItem, MkrNavItemGroup } from '../../../mikado_reborn/src/components';
import { NavItemTypes } from '../../../mikado_reborn/src/components/NavItem/NavItemGroup.vue'

export default {
  title: 'Components/NavItem',
  component: MkrNavItem,
  subcomponents: { 'MkrNavItemGroup': MkrNavItemGroup },
  argTypes: {
    type: { control: { type: 'select', options: NavItemTypes, default: NavItemTypes[0] } },
  },
};

const MainNavTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <div style="padding:2rem;display:flex;">
      <nav style="margin-right:2rem;" aria-label="Application links">
        <mkr-nav-item-group :horizontal="horizontal">
          <mkr-nav-item
            v-for="index in 3"
            :key="index"
            :active="index === 3"
            href="#"
            icon="book-open"
          >
            Label
          </mkr-nav-item>
        </mkr-nav-item-group>
      </nav>
      <nav aria-label="Application icon links">
        <mkr-nav-item-group :horizontal="horizontal">
          <mkr-nav-item
            v-for="index in 3"
            :key="index"
            :active="index === 3"
            href="#"
            icon="book-open"
          />
        </mkr-nav-item-group>
      </nav>
    </div>
  `,
});

export const MainNavItems = MainNavTemplate.bind({});
MainNavItems.args = {
  horizontal: false,
};

const NavItemsTemplate = (args) => ({
  props: Object.keys(args),
  template: `
    <div style="padding:2rem;">
      <nav>
        <mkr-nav-item-group :type="type" :horizontal="horizontal">
          <mkr-nav-item
            v-for="index in 3"
            :key="index"
            :active="index === 3"
            href="#"
            icon="book-open"
          >
            Label
          </mkr-nav-item>
        </mkr-nav-item-group>
      </nav>
    </div>
  `,
});

export const NavItems = NavItemsTemplate.bind({});
NavItems.args = {
  type: 'main',
  horizontal: false,
};

const TopNavItemsTemplate = () => ({
  template: `
    <div style="padding:2rem;">
      <nav style="height:72px;">
        <mkr-nav-item-group top-nav>
          <mkr-nav-item
            v-for="index in 3"
            :key="index"
            :active="index === 3"
            href="#"
            icon="book-open"
          >
            Label
          </mkr-nav-item>
        </mkr-nav-item-group>
      </nav>
    </div>
  `,
});

export const TopNavItems = TopNavItemsTemplate.bind({});