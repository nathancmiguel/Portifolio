<template>
    <section class="block" id="contacts">
        <div class="container">
            <div class="block-head">
                <h2>{{ $t('contacts') }}</h2>
                <span class="num">02 / 02</span>
            </div>

            <!-- Grade 2x2 com os dados de contato. -->
            <div class="contact-grid">
                <div class="contact-cell">
                    <span class="label">Youtube</span>
                    <strong class="underline">
                        <ULink href="https://www.youtube.com/@NathanMiguel1" target="_blank">/NathanMiguel1</ULink>
                    </strong>
                </div>
                <div class="contact-cell">
                    <span class="label">Github</span>
                    <strong class="underline">
                        <ULink href="https://github.com/nathancmiguel" target="_blank">/nathancmiguel</ULink>
                    </strong>
                </div>
                <div class="contact-cell">
                    <span class="label">Grupo do Discord</span>
                    <strong class="underline">
                        <ULink href="https://discord.gg/DBNATxA6Jx" target="_blank">/Nathan Miguel</ULink>
                    </strong>
                </div>
                <div class="contact-cell">
                    <span class="label">Linkedin</span>
                    <strong class="underline">
                        <ULink href="https://www.linkedin.com/in/nathancmiguel/" target="_blank">/nathancmiguel</ULink>
                    </strong>
                </div>
            </div>

            <!-- Linha de redes sociais. Troque o "#" pelo link completo
           do seu perfil em cada rede (ex: https://instagram.com/seuusuario). -->
            <div class="socials">
                <ULink href="mailto:nathan.cm77@gmail.com" target="_blank">email</ULink>
                <ULink href="https://www.instagram.com/nathan_cmiguel/" target="_blank">instagram</ULink>
                <ULink href="https://x.com/nathancmig" target="_blank">x/twitter</ULink>
            </div>
        </div>
    </section>
</template>