import Ember from 'ember';

const { observer, run } = Ember;

export default Ember.Component.extend({
  classNames: ['temperature-gauge'],
  classNameBindings: ['process'],

  limits: {
    wave: {
      label: 'Wave Soldering',
      lmpa: [200, 230],
      sac: [260, 280]
    },
    selective: {
      label: 'Selective Soldering',
      lmpa: [200, 250],
      sac: [270, 320]
    },
    reflow: {
      label: 'Reflow Soldering',
      lmpa: [190, 220],
      sac: [235, 250]
    }
  },

  process: 'wave',
  current: null,
  label: null,
  minTempLMPA: null,
  maxTempLMPA: null,
  minTempSAC: null,
  maxTempSAC: null,

  timer: {
    lmpa: null,
    sac: null
  },

  init: function() {
    this._super(...arguments);
    this.setValues();
  },

  observeProcess: observer('process', function() {
    run.cancel(this.get('timer').lmpa);
    run.cancel(this.get('timer').sac);
    this.setValues();
    this.animateArrow('lmpa');
    this.animateArrow('sac');
  }),

  setValues() {
    const current = this.get('limits')[this.get('process')];
    this.set('label', current.label);
    this.set('minTempLMPA', current.lmpa[0]);
    this.set('maxTempLMPA', current.lmpa[1]);
    this.set('minTempSAC', current.sac[0]);
    this.set('maxTempSAC', current.sac[1]);
  },

  // Return random number between 0 and 1 with a normal distribution
  random() {
    return (
      (1 +
        (Math.random() +
          Math.random() +
          Math.random() +
          Math.random() +
          Math.random() +
          Math.random() -
          3) /
          3) /
      2
    );
  },

  animateArrow(alloy, intro) {
    const self = this;
    const process = this.get('process');
    const limits = this.get('limits')[process][alloy];
    const min = limits[0];
    const max = limits[1];
    const range = max - min;
    const random = this.random();
    const temperature = min + range * random;
    const degrees = temperature * ((2 * 108) / 350) - 108;
    const duration = 1000 + random * 1400;
    const $lmpa = this.$(`#arrow-${alloy}>g`);
    if (intro) {
      $lmpa.velocity('stop').velocity(
        {
          rotateZ: [`${degrees}deg`, -108]
        },
        {
          duration: 5000,
          easing: 'easeInOut'
        }
      );
    } else {
      $lmpa.velocity('stop').velocity(
        {
          rotateZ: `${degrees}deg`
        },
        {
          duration: duration,
          easing: 'easeInOut'
        }
      );
    }
    const delay = intro ? 5100 : duration * 1.1;
    this.get('timer')[alloy] = run.later(
      self,
      function() {
        self.animateArrow(alloy);
      },
      delay
    );
  },

  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  },

  didInsertElement: function() {
    this.animateArrow('lmpa', true);
    this.animateArrow('sac', true);
  },

  willDestroy() {
    run.cancel(this.get('timer').lmpa);
    run.cancel(this.get('timer').sac);
  }
});
