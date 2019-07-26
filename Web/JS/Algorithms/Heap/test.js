
class Heap {
    constructor(initial = []) {
      this.elements = []
      for (var i of initial) {
        this.elements.push(i)
      }
      this.heapify()
    }

    swap(i, j) {
      [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]]
    }

    heapUp(idx) {
      var pidx = (idx - 1) >> 1
      if (this.elements[idx] > this.elements[pidx]) {
        this.swap(idx, pidx)
        if (pidx > 0) {
          this.heapUp(pidx)
        }
      }
    }

    heapDown(idx, end = this.elements.length - 1) {
      var lidx = idx * 2 + 1
        , ridx = idx * 2 + 2
        , maxidx = idx
      if (lidx <= end && this.elements[lidx] && this.elements[lidx] > this.elements[idx]) {
        maxidx = lidx
      }
      if (ridx <= end && this.elements[ridx] && this.elements[ridx] > this.elements[lidx]) {
        maxidx = ridx
      }
      if (idx !== maxidx) {
        this.swap(idx, maxidx)
        this.heapDown(maxidx, end)
      }
    }

    add(val) {
      this.elements.push(val)
      this.heapUp(this.elements.length - 1)
      return this
    }

    remove() {
      this.elements[0] = this.elements.pop()
      this.heapDown(0)
      return this
    }

    heapify() {
      for (let i = ((this.elements.length - 2) >> 1); i >= 0; i--) {
        this.heapDown(i)
      }
      return this
    }

    heapSort() {
      for (var i = this.elements.length - 1; i > 0; i--) {
        this.swap(0, i)
        this.heapDown(0, i - 1)
      }
      return this
    }
  }

  let a = new Heap()
  Array(100).fill(0).map(x=>Math.floor(Math.random() * 100)).forEach(x=>a.add(x))
  console.log(a)
  console.log(a.heapSort())
  Array(30).fill(0).map(x=>Math.floor(Math.random() * 500)).forEach(x=>a.add(x))
  console.log(a.heapSort())