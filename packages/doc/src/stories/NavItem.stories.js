import { MkrNavItem, MkrNavItemGroup } from "../../../mikado_reborn/src/components";

export default {
  title: 'Components/NavItem',
  component: MkrNavItem,
  subcomponents: { 'MkrNavItemGroup': MkrNavItemGroup },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <div class="primary-light-bg" style="padding:2rem;">
      <!-- application links -->
      <nav aria-label="application">
        <mkr-nav-item-group>
          <mkr-nav-item active>
            <mkr-icon name="user"/>
            <a href="#">Mon profil</a>
          </mkr-nav-item>
          <mkr-nav-item>
            <mkr-icon name="briefcase"/>
            <a href="#">Mon projet</a>
          </mkr-nav-item>
          <mkr-nav-item>
            <mkr-icon name="cog"/>
            <a href="#">Paramètres</a>
          </mkr-nav-item>
        </mkr-nav-item-group>
      </nav>
      <!-- external links -->
      <mkr-nav-item-group style="padding-top:5rem;">
        <mkr-nav-item>
          <a href="#" target="_blank">Programme de fidélité</a>
        </mkr-nav-item>
        <mkr-nav-item>
          <a href="#">Parrainage</a>
        </mkr-nav-item>
        <mkr-nav-item>
          <a href="#">Codes promo</a>
        </mkr-nav-item>
      </mkr-nav-item-group>
    </div>
  `,
});

export const NavItem = Template.bind({});
NavItem.args = {};
