<template>
  <div>
    <section>
      <div class="container flex-column">
        <h1>
          Evelyn T.
        </h1>
        <p class="no-select">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum corporis magnam facere fugiat nihil, id quia, impedit tempore eligendi totam beatae incidunt eius. Enim consequuntur fuga alias velit? Maxime, est.</p>
      </div>
    </section>
    <section>
      <Card>
        <Progress :radius="60" :progress="40" :stroke="14" color="hotpink" under-color="pink" />
        <div class="no-select">
          <h4 class="mb-0 font-weight-bold text-muted">Your Score</h4>
          <p class="small font-weight-bold text-muted">You got <span class="text-success">12</span> out of <span class="text-danger">12</span> correct on the multiplication table of 3s.</p>
        </div>
      </Card>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import { Print } from '~/utils/print';
export default {
  layout: "main",
  middleware: 'hidestatusbar',
  mounted() {
    Print.printName('Tu');
  }
}
</script>


