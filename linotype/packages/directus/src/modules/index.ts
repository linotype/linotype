import { defineModule } from '@directus/extensions-sdk';
import DashboardPage from './pages/dashboard.vue'
import SettingsPage from './pages/settings.vue'
import BlocksPage from './pages/blocks.vue'
import InstallPage from './pages/install.vue'

export default defineModule({
	id: 'linotype',
	name: 'linotype',
	icon: 'space_dashboard',
	routes: [
		{
			path: '',
			redirect: '/linotype/dashboard',
		},
    {
			path: 'dashboard',
			component: DashboardPage,
		},
    {
			path: 'blocks',
			component: BlocksPage,
		},
    {
			path: 'settings',
			component: SettingsPage,
		},
    {
			path: 'install',
			component: InstallPage,
		},
	],
})
