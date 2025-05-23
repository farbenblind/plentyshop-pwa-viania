<template>
  <div>
    <EditablePage :identifier="'index'" :type="'immutable'" />
    <BhFinder />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { setPageMeta } = usePageMeta();
const icon = 'home';
setPageMeta(t('homepage.title'), icon);

const { getRobots, setRobotForStaticPage } = useRobots();
getRobots();
setRobotForStaticPage('Homepage');
</script>
