<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { initPreloader, removePreloader } from '@/components/loaders/useBaseLoader'
import { getLangForPage, getConfig } from '@/config/BasicConfig';

const PAGE = 'aboutUs';
const router = useRouter();

//Así se implementa el cambio de idioma, IMPORTANTE el operador condicional(o v-if) en el template para que no se caiga la página
const lang = ref({});

onMounted(async () => {
  initPreloader();
  await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
    lang.value = data;
    removePreloader();
  }).catch(() => {
    router.go(0);
  });
});

</script>

<template>
    <div class="container">
        <div class="main-timeline">

            <!-- start experience section-->
            <div class="timeline">
                <div class="icon"></div>
                <div class="date-content">
                    <div class="date-outer">
                        <span class="date">
                            <span class="month">{{ lang.aboutUs?.titles?.month1 || '' }}</span>
                            <span class="year">2010</span>
                        </span>
                    </div>
                </div>
                <div class="timeline-content">
                    <h5 class="title">{{ lang.aboutUs?.titles?.timelineTitle1 || ''}}</h5>
                    <p class="description">
                        {{ lang.aboutUs?.body?.timelineDescription1 || '' }}
                    </p>
                </div>
            </div>
            <!-- end experience section-->

            <!-- start experience section-->
            <div class="timeline">
                <div class="icon"></div>
                <div class="date-content">
                    <div class="date-outer">
                        <span class="date">
                            <span class="month">{{ lang.aboutUs?.titles?.month2 || '' }}</span>
                            <span class="year">2011</span>
                        </span>
                    </div>
                </div>
                <div class="timeline-content">
                    <h5 class="title">{{ lang.aboutUs?.titles?.timelineTitle2 || ''}}</h5>
                    <p class="description">
                        {{ lang.aboutUs?.body?.timelineDescription2 || '' }}
                    </p>
                </div>
            </div>
            <!-- end experience section-->

            <!-- start experience section-->
            <div class="timeline">
                <div class="icon"></div>
                <div class="date-content">
                    <div class="date-outer">
                        <span class="date">
                            <span class="month">{{ lang.aboutUs?.titles?.month3 || '' }}</span>
                            <span class="year">2011</span>
                        </span>
                    </div>
                </div>
                <div class="timeline-content">
                    <h5 class="title">{{ lang.aboutUs?.titles?.timelineTitle3 || ''}}</h5>
                    <p class="description">
                        {{ lang.aboutUs?.body?.timelineDescription3 || '' }}
                    </p>
                </div>
            </div>
            <!-- end experience section-->

            <!-- start experience section-->
            <div class="timeline">
                <div class="icon"></div>
                <div class="date-content">
                    <div class="date-outer">
                        <span class="date">
                            <span class="month">{{ lang.aboutUs?.titles?.month4 || '' }}</span>
                            <span class="year">2011</span>
                        </span>
                    </div>
                </div>
                <div class="timeline-content">
                    <h5 class="title">{{ lang.aboutUs?.titles?.timelineTitle4 || ''}}</h5>
                    <p class="description">
                        {{ lang.aboutUs?.body?.timelineDescription4 || '' }}
                    </p>
                </div>
            </div>
            <!-- end experience section-->

        </div>
    </div>
</template>

<style scoped>

.main-timeline {
    position: relative
}

p{
    color: var(--text-color-3);
}

.main-timeline:before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: var(--background-color);
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0
}

.main-timeline .timeline {
    margin-bottom: 40px;
    position: relative
}

.main-timeline .timeline:after {
    content: "";
    display: block;
    clear: both
}

.main-timeline .icon {
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0
}

.main-timeline .icon:before,
.main-timeline .icon:after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.33s ease-out 0s
}

.main-timeline .icon:before {
    background: var(--background-color);
    border: 2px solid var(--accent-color);
    left: -3px
}

.main-timeline .icon:after {
    border: 2px solid var(--accent-color);
    left: 3px
}

.main-timeline .timeline:hover .icon:before {
    left: 3px
}

.main-timeline .timeline:hover .icon:after {
    left: -3px
}

.main-timeline .date-content {
    width: 50%;
    float: left;
    margin-top: 22px;
    position: relative
}

.main-timeline .date-content:before {
    content: "";
    width: 36.5%;
    height: 2px;
    background: var(--background-color);
    margin: auto 0;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0
}

.main-timeline .date-outer {
    width: 125px;
    height: 125px;
    font-size: 16px;
    text-align: center;
    margin: auto;
    z-index: 1
}

.main-timeline .date-outer:before,
.main-timeline .date-outer:after {
    content: "";
    width: 125px;
    height: 125px;
    margin: 0 auto;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.33s ease-out 0s
}

.main-timeline .date-outer:before {
    background: var(--accent-color);
    border: 2px solid var(--background-color);
    left: -6px
}

.main-timeline .date-outer:after {
    border: 2px solid var(--accent-color);
    left: 6px
}

.main-timeline .timeline:hover .date-outer:before {
    left: 6px
}

.main-timeline .timeline:hover .date-outer:after {
    left: -6px
}

.main-timeline .date {
    width: 100%;
    margin: auto;
    position: absolute;
    top: 27%;
    left: 0
}

.main-timeline .month {
    font-size: 18px;
    font-weight: 700
}

.main-timeline .year {
    display: block;
    font-size: 30px;
    font-weight: 700;
    color: var(--text-color-3);
    line-height: 36px
}

.main-timeline .timeline-content {
    width: 50%;
    padding: 20px 0 20px 50px;
    float: right
}

.main-timeline .title {
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;
    margin: 0 0 15px 0
}

.main-timeline .description {
    margin-bottom: 0
}

.main-timeline .timeline:nth-child(2n) .date-content {
    float: right
}

.main-timeline .timeline:nth-child(2n) .date-content:before {
    left: 10px
}

.main-timeline .timeline:nth-child(2n) .timeline-content {
    padding: 20px 50px 20px 0;
    text-align: right
}

@media only screen and (max-width: 991px) {
    .main-timeline .date-content {
        margin-top: 35px
    }
    .main-timeline .date-content:before {
        width: 22.5%
    }
    .main-timeline .timeline-content {
        padding: 10px 0 10px 30px
    }
    .main-timeline .title {
        font-size: 17px
    }
    .main-timeline .timeline:nth-child(2n) .timeline-content {
        padding: 10px 30px 10px 0
    }
}

@media only screen and (max-width: 767px) {
    .main-timeline:before {
        margin: 0;
        left: 7px
    }
    .main-timeline .timeline {
        margin-bottom: 20px
    }
    .main-timeline .timeline:last-child {
        margin-bottom: 0
    }
    .main-timeline .icon {
        margin: auto 0
    }
    .main-timeline .date-content {
        width: 95%;
        float: right;
        margin-top: 0
    }
    .main-timeline .date-content:before {
        display: none
    }
    .main-timeline .date-outer {
        width: 110px;
        height: 110px
    }
    .main-timeline .date-outer:before,
    .main-timeline .date-outer:after {
        width: 110px;
        height: 110px
    }
    .main-timeline .date {
        top: 30%
    }
    .main-timeline .year {
        font-size: 24px
    }
    .main-timeline .timeline-content,
    .main-timeline .timeline:nth-child(2n) .timeline-content {
        width: 95%;
        text-align: center;
        padding: 10px 0
    }
    .main-timeline .title {
        margin-bottom: 10px
    }
}

</style>