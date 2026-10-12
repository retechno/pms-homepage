<script setup lang="ts">
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import TrustStrip from './components/TrustStrip.vue'
import FeatureRow from './components/FeatureRow.vue'
import TapeChart from './components/mockups/TapeChart.vue'
import PhoneTasks from './components/mockups/PhoneTasks.vue'
import AccountingSection from './components/AccountingSection.vue'
import ChargeTrace from './components/ChargeTrace.vue'
import ReportsSection from './components/ReportsSection.vue'
import RoadmapSection from './components/RoadmapSection.vue'
import IntegrationsSection from './components/IntegrationsSection.vue'
import AudienceSection from './components/AudienceSection.vue'
import PricingFaq from './components/PricingFaq.vue'
import DemoSection from './components/DemoSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { frontOffice, housekeeping } from './content/features'
</script>

<template>
  <SiteNav />
  <main id="main">
    <HeroSection />
    <TrustStrip />
    <FeatureRow v-bind="frontOffice">
      <TapeChart />
    </FeatureRow>
    <div class="page"><hr class="border-line" /></div>
    <FeatureRow v-bind="housekeeping" reverse>
      <PhoneTasks />
    </FeatureRow>
    <AccountingSection />
    <ChargeTrace />
    <ReportsSection />
    <RoadmapSection />
    <IntegrationsSection />
    <AudienceSection />
    <PricingFaq />
    <DemoSection />
  </main>
  <SiteFooter />
</template>
