<script setup lang="ts">
import DesktopNavigation from "../components/navigations/desktop-navigation.vue";
import MobileNavigation from "../components/navigations/mobile-navigation.vue";
import AppToolbar from "../components/navigations/app-toolbar.vue";
import SideBar from "../components/navigations/side-bar.vue";
import type { MenuItem } from "../interfaces/navigation-menu.ts";

// Declarations
// refs
const navigationMenu = ref<MenuItem[]>([
  {
    label: "Customers",
    to: "/customers",
    icon: "mdi:human-greeting-variant",
  },
]);
const desktopSideBarOpen = ref(true);
const mobileSideBarOpen = ref(false);

// Methods
const toggleDesktopSidebar = () => {
  desktopSideBarOpen.value = !desktopSideBarOpen.value;
};
const toggleMobileSidebar = () => {
  mobileSideBarOpen.value = !mobileSideBarOpen.value;
};
</script>

<template>
  <div>
    <!-- Mobile View -->
    <div tabindex="0" @keydown.esc="mobileSideBarOpen = false">
      <div class="relative sm:hidden">
        <div v-show="mobileSideBarOpen" class="fixed inset-0 top-0 z-[100] flex">
          <div class="relative z-[100] flex w-full flex-1 flex-col bg-blue-200 pb-4">
            <div key="adsf" class="!text-white">
              <div class="flex items-center justify-between p-4">
                <span class="text-blue-900">CUSTOMER DATA</span>
                <icon name="clarity:times-circle-line" class="h-6 w-6 cursor-pointer hover:text-blue-500" @click="toggleMobileSidebar" />
              </div>
              <MobileNavigation :menu-items="navigationMenu" @toggle-mobile-sidebar="toggleMobileSidebar" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop View -->
    <SideBar :class="[desktopSideBarOpen ? 'block !w-56' : 'hidden !w-0', 'transition-duration overflow-hidden']">
      <DesktopNavigation :menu-items="navigationMenu" />
    </SideBar>

    <div :class="[desktopSideBarOpen ? 'sm:pl-56' : ' sm:pl-0', 'flex w-full flex-1 flex-col transition duration-500  bg-white ']">
      <AppToolbar class="z-[20] flex h-12 flex-shrink-0 border-b-2 shadow sticky top-0 !z-2" @toggle-mobile-sidebar="toggleMobileSidebar" @toggle-desktop-sidebar="toggleDesktopSidebar" />
      <main :class="'p-5 z-10 !text-slate-900  transition-all'">
        <slot />
      </main>
    </div>
  </div>
</template>
