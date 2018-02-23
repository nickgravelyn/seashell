const defaultOptions = {
  async: false,
}

export class TimelineStep {
  constructor (timeline, options) {
    this.timeline = timeline
    this.options = options ? Object.assign({}, defaultOptions, options) : defaultOptions
  }

  start (next) {
    if (this.options.async) {
      this.timeline.start()
      next()
    } else {
      this.timeline.start({ onComplete: next })
    }
  }

  stop () {
    this.timeline.stop()
  }

  createCss () {
    return this.timeline.createCss()
  }
}