<template>
    <section class="block" id="trabalhos">
        <div class="container">
            <div class="block-head">
                <h2>{{ $t('my-projects') }}</h2>
                <span class="num">01 / 02</span>
            </div>

            <div class="works">
                <ULink class="work" href="https://github.com/RunaEngine/Engine" target="_blank">
                    <img src="/img/runa.png" alt="Runa Engine" />
                    <h3>Runa Engine</h3>
                    <p class="work-desc">
                        {{ $t('runa-desc') }}
                    </p>
                    <div class="work-meta">
                        <span>Ver detalhes →</span>
                    </div>
                </ULink>

                <a class="work" href="https://github.com/orgs/LabPointer/repositories" target="_blank">
                    <img src="/img/labpoint.png" alt="Capa do Trabalho 02" />
                    <h3>Labpoint</h3>
                    <p class="work-desc">
                        {{ $t('lab-desc') }}
                    </p>
                    <div class="work-meta">
                        <span>Ver detalhes →</span>
                    </div>
                </a>

                <a class="work" href="https://github.com/orgs/BangbooBot/repositories" target="_blank">
                    <img src="/img/bangboo.png" alt="Capa do Trabalho 03" />
                    <h3>Bangboo</h3>
                    <p class="work-desc">
                        {{ $t('bang-desc') }}
                    </p>
                    <div class="work-meta">
                        <span>Ver detalhes →</span>
                    </div>
                </a>

                <a class="work" href="https://internet-protocol-documentation.vercel.app/" target="_blank">
                    <img src="/img/ip.png" alt="Engine User Settings" />
                    <h3>Internet Protocol</h3>
                    <p class="work-desc">
                        {{ $t('ip-desc') }}
                    </p>
                    <div class="work-meta">
                        <span>Ver detalhes →</span>
                    </div>
                </a>

                <a class="work" href="https://github.com/nathancmiguel/discloud-rs" target="_blank">
                    <img src="/img/discloud.png" alt="API da discloud" />
                    <h3>Discloud API</h3>
                    <p class="work-desc">
                        {{ $t('discloud-desc') }}
                    </p>
                    <div class="work-meta">
                        <span>Ver detalhes →</span>
                    </div>
                </a>

                <a class="work" href="https://engine-user-settings-documentation.vercel.app/" target="_blank">
                    <img src="/img/eus.png" alt="Engine User Settings" />
                    <h3>Engine User Settings</h3>
                    <p class="work-desc">
                        {{ $t('eus-desc') }}
                    </p>
                    <div class="work-meta">
                        <span>Ver detalhes →</span>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>