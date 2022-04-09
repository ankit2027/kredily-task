import React, { Component } from 'react'
import styles from './Invoice.module.scss'
import LineItems from './LineItems'
class Invoice extends Component {

  state = {
    taxRate: 0.00,
    lineItems: [
      {
        id: null,
        name: '',
        description: '',
        quantity: 0,
        price: 0.00,
      },
    ]
  }

  handleInvoiceChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    this.setState({lineItems})
  }

  handleAddLineItem = (event) => {
    this.setState({
      lineItems: this.state.lineItems.concat(
        [{ id: Math.floor((Math.random() * 1000) + 1), name: '', description: '', quantity: 0, price: 0.00 }]
      )
    })
  }

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handlePrintButton = () => {
    alert('This button will print the bill.')
  }

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100)
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
  }

  calcTaxTotal = () => {
    return this.calcLineItemsTotal() * (this.state.taxRate / 100)
  }

  calcGrandTotal = () => {
    return this.calcLineItemsTotal() + this.calcTaxTotal()
  }

  render = () => {
    return (

      <div className={styles.invoice}>
        <div className={styles.brand}>
          <img src="https://kredily.com/wp-content/uploads/2019/03/Kredily-Logo-e1553071876281.png" alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.addresses}>
          <div className={styles.from}>
            <strong>Kredily</strong><br />
            #434, 1st Floor, J.R. Arcade, 17th Cross Road,<br />
            above Raymond Showroom, Sector 4, HSR Layout<br />
            Bengaluru, Karnataka 560102
          </div>
          <div>
            <div className={`${styles.valueTable} ${styles.to}`}>
            <div className={styles.row}>
                <div className={styles.label}>Date</div>
                <div className={`${styles.value} ${styles.date}`}>{Date()}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Customer #</div>
                <div className={styles.value}>KR-{Math.floor((Math.random() * 10000) + 1)}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Invoice #</div>
                <div className={styles.value}>IN-{Math.floor((Math.random() * 10000) + 1)}</div>
              </div>
            </div>
          </div>
        </div>
        <h2>Invoice</h2>

          <LineItems
            items={this.state.lineItems}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            deleteHandler={this.handleRemoveLineItem}
          />

        <div className={styles.totalContainer}>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Tax Rate (%)</div>
                <div className={styles.value}><input name="taxRate" type="number" step="0.01" value={this.state.taxRate} onChange={this.handleInvoiceChange} /></div>
              </div>
            </div>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Subtotal: </div>
                <div className={`${styles.value} ${styles.currency}`}>{this.calcLineItemsTotal()}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Tax ({this.state.taxRate}%): </div>
                <div className={`${styles.value} ${styles.currency}`}>{this.calcTaxTotal()}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total Due:</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.calcGrandTotal()}</div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.pay}>
          <button className={styles.payNow} onClick={this.handlePrintButton}>Print</button>
        </div>

      </div>

    )
  }

}

export default Invoice
