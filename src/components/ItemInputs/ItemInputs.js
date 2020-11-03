import React from "react"
import { Input, Required, Label} from '../Form/Form';
import Button from '../Button/Button';
import './ItemInputs.css'
const ItemInputs = (props) => {

       // this.searchBoxRef.current.focus()
    
    return (
        props.items.map((item, idx)=> {
            let itemId = `item-${idx}`
            return(
                <div key={idx} htmlFor={`${itemId}`} className='item-form'>
                    <Label htmlFor={`${itemId}-name`}>{`Item #${idx + 1}`}<Required /></Label>
                    <Input
                        id={`${itemId}-name`}
                        name={itemId+1}
                        className="item_name"
                        onChange={ev => props.handleItemChange(ev, idx, 'item_name')}
                        placeholder='ex) Baby Clothes'
                        required
                        value={item.item_name}
                    />
                    <Label htmlFor={`${itemId}-amount`}>
                        What is the location's desired amount of this?<Required />
                    </Label>
                    <Input
                        id={`${itemId}-amount`}
                        type='number'
                        min= '5'
                        max= '999'
                        name='critical_amount'
                        className='critical_amount'
                        onChange={ev => props.handleItemChange(ev, idx, 'critical_amount')}
                        placeholder='ex) 100'
                        required
                        value={item.critical_amount}
                    />
                    <Button onClick={ev => { ev.preventDefault(); props.handleDeleteItem(idx) }}>
                        Delete Item
                    </Button>
                </div>
            )
        })
    )
}
export default ItemInputs