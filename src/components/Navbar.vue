<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { MenuIcon, XIcon, MoonIcon, SunIcon, LanguagesIcon, ChevronDownIcon } from "lucide-vue-next";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { onMounted, onUnmounted, ref } from "vue";

// Vars
const { t, locale } = useI18n();

// Refs
const showMobileMenu = ref<boolean>(false);

onMounted(function () {
    locale.value = localStorage.getItem("language") || "en";
    window.addEventListener("resize", checkScreenSize);
});

onUnmounted(function () {
    window.removeEventListener("resize", checkScreenSize);
});

const isDark = useDark({
    onChanged(isDark) {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },
});
//const toggleDark = useToggle(isDark);

// Functions
function toggleLanguage(lang: "en" | "pt") {
    locale.value = lang;
    localStorage.setItem("language", lang);
}

function checkScreenSize() {
    if (window.innerWidth > 1024) showMobileMenu.value = false;
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
    <nav>
        <div class="w-full max-w-5xl flex">
            <div class="nav-links">
                <input type="checkbox" id="navmenu" class="navmenu-input" v-model="showMobileMenu" />
                <label for="navmenu">
                    <div>
                        <MenuIcon class="hamburger-icon" />
                        <XIcon class="x-icon" />
                    </div>
                </label>
                <div>
                    <a @click="scrollToSection('about')">
                        <p>{{ t("nav.home") }}</p>
                        <div />
                    </a>
                    <a @click="scrollToSection('projects')">
                        <p>{{ t("nav.projects") }}</p>
                        <div />
                    </a>
                </div>
            </div>
            <div class="nav-configs">
                <Menu as="div" class="locale-button">
                    <div>
                        <MenuButton as="button">
                            <LanguagesIcon as="svg" />
                            {{
                                locale === 'en' ? 'EN' :
                                    locale === 'pt' ? 'PT' :
                                        ''
                            }}
                            <ChevronDownIcon as="svg" aria-hidden="true" />
                        </MenuButton>
                    </div>
                    <MenuItems class="locale-options">
                        <div class="py-1">
                            <MenuItem as="div">
                            <button @click="toggleLanguage('en')">EN</button>
                            </MenuItem>
                            <MenuItem as="div">
                            <button @click="toggleLanguage('pt')">PT</button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
                <input type="checkbox" id="darkmode-toggle" class="darkmode-input" v-model="isDark" />
                <label for="darkmode-toggle" class="darkmode-label">
                    <div class="darkmode-toggle-circle">
                        <MoonIcon class="darkmode-toggle-moon" />
                        <SunIcon class="darkmode-toggle-sun" />
                    </div>
                </label>
            </div>
        </div>
        <div :class="[showMobileMenu ? 'h-23 mt-4 opacity-100' : 'h-0 mt-0 opacity-0', 'nav-mobile-links']">
            <a @click="scrollToSection('about')">{{ t("nav.home") }}</a>
            <a @click="scrollToSection('projects')">{{ t("nav.projects") }}</a>
        </div>
    </nav>
</template>

<style scoped></style>
