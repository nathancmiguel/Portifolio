<script lang="ts" setup>
const date = new Date()
const currentYear = date.getFullYear()

const footerLinks = [
    {
        label: "GitHub",
        href: "https://github.com/nathancmiguel",
        icon: "i-simple-icons-github"
    },
]
</script>

<template>
    <footer>
        <div class="container font-bold">© {{ currentYear }}, Nathan Miguel</div>
    </footer>
</template>