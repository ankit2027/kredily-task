import React, { Component } from 'react'
import PropTypes from 'prop-types';
import LineItem from './LineItem'
import { MdAddCircle as AddIcon } from 'react-icons/md'
import styles from './LineItems.module.scss'


class LineItems extends Component {

  render = () => {

    const {items, addHandler, ...functions} = this.props

    return (
      <form>

        <div className={styles.lineItems}>
          <div className={`${styles.gridTable}`}>

            <div className={`${styles.row} ${styles.header}`}>
              <div>#</div>
              <div>Item</div>
              <div>Note</div>
              <div>Qty</div>
              <div>Price</div>
              <div>Total</div>
              <div></div>
            </div>

            {this.props.items.map((item, i) => (
                      <div key={item.id} draggableId={item.id} index={i}>
                            <LineItem
                              style={{color: 'red'}}
                              key={i + item.id} index={i} name={item.name}
                              notes={item.notes} quantity={item.quantity} price={item.price}
                              {...functions}
                            />
                      </div>
                    ))}

          </div>

          <div className={styles.addItem}>
            <button type="button" onClick={addHandler}><AddIcon size="1.25em" className={styles.addIcon} /> Add Row</button>
          </div>

        </div>
      </form>

    )
  }
}

export default LineItems

LineItems.propTypes = {
  items: PropTypes.array.isRequired,
  addHandler: PropTypes.func.isRequired,
}


