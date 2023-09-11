(function() {
  namespace Spyder {
    export interface Timing {
      id: string;
      start: number;
      stop?: number;
      type?: string;
    }

    export interface Chart {
      timingsArr: Timing[];
      container: HTMLElement;
      wrapper: HTMLElement;
      minStart: number;
      init(): void;
      bind(): void;
      drawChart(): void;
      addBackendRegion(): void;
      addTag(obj: Timing): void;
      addRange(obj: Timing): void;
    }

    export const chart: Chart = {
      timingsArr: [],
      container: document.getElementById('spyder-chart'),
      wrapper: document.createElement('div'),
      minStart: 0,
      init() {
        const timings = Spyder.data.timings;
        for (const key in timings) {
          const obj = timings[key];
          obj.id = key;
          this.timingsArr.push(obj);
        }

        this.timingsArr.sort((a, b) => {
          if (a.start < b.start) return -1;
          if (a.start > b.start) return 1;
          return 0;
        });

        this.minStart = this.timingsArr[0].start;
        this.drawChart();
        this.bind();
      },
      bind() {
        $(this.wrapper).on('mouseover', (evt) => {
          const $target = $(evt.target);
          let str = '';

          if ($target.hasClass('range')) {
            str = `RANGE: ${$target.data('id')}: ${$target.data('diff')}ms`;
            console.log(str);
          }
          if ($target.hasClass('tag')) {
            str = `TAG: ${$target.data('id')}: @${$target.data('start')}ms`;
            console.log(str);
          }
        });
      },
      drawChart() {
        const timingsArr = this.timingsArr;
        const len = timingsArr.length;

        this.addBackendRegion();

        for (let n = 0; n < len; n++) {
          const obj = timingsArr[n];
          if (obj.stop) {
            this.addRange(obj);
          } else {
            this.addTag(obj);
          }
        }
      },
      addBackendRegion() {
        const backendWidth = this.minStart * -1;
        const backend = document.createElement('div');

        backend.style.width = `${backendWidth}px`;
        backend.className = 'backend';
        this.wrapper.appendChild(backend);
      },
      addTag(obj) {
        const bar = document.createElement('div');
        const { id, start, type } = obj;

        bar.className = 'tag';
        bar.style.marginLeft = `${parseInt(start - this.minStart)}px`;
        bar.setAttribute('data-id', id);
        bar.setAttribute('data-start', start);
        bar.setAttribute('data-type', type);
        this.wrapper.appendChild(bar);
      },
      addRange(obj) {
        const bar = document.createElement('div');
        const { id, start, stop, type = '' } = obj;
        const diff = stop - start;

        bar.className = `${type} range`;
        bar.style.marginLeft = `${parseInt(start - this.minStart)}px`;
        bar.style.width = `${diff}px`;
        bar.setAttribute('data-id', id);
        bar.setAttribute('data-start', start);
        bar.setAttribute('data-stop', stop);
        bar.setAttribute('data-type', type);
        bar.setAttribute('data-diff', diff);
        this.wrapper.appendChild(bar);
      }
    };
  }

  Spyder.chart.init();
})();
