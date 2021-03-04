import React, { useState, useEffect } from 'react'
import { MdArrowDownward as MdArrow } from 'react-icons/md'

import clsx from 'clsx'

import '../assets/styles/components/listTable.scss'

const SortingArrows = ({ sortedStatus }) => {
  return sortedStatus ? (
    <div className="sorting-arrow">
      <MdArrow
        className={clsx('sorted-arrow', {
          'sorted-arrow-up': sortedStatus.isReverse,
          'sorted-arrow-down': !sortedStatus.isReverse
        })}
      />
    </div>
  ) : null
}

// We are not using the html "table" element because each row is a link.
// implementing that functionality with table is very complex, and also bad for accessibility reasons.
// Therefore an unordered list is used
const ListTable = ({ headItems, bodyItems }) => {
  const NO_ACTIVE_SORTING_INDEX = -1
  const [sortingInfo, setSortingInfo] = useState({
    sortingIndex: NO_ACTIVE_SORTING_INDEX,
    isReverse: false
  })
  const [sortedBodyItems, setSortedBodyItems] = useState(bodyItems)

  useEffect(() => {
    let sortedItems = [...bodyItems]
    if (sortingInfo.sortingIndex || sortingInfo.sortingIndex === 0) {
      sortedItems = sortedItems.sort(({ data: a }, { data: b }) => {
        const sortingValueA = a[sortingInfo.sortingIndex].sortingValue
        const sortingValueB = b[sortingInfo.sortingIndex].sortingValue
        const sortingType = b[sortingInfo.sortingIndex].sortingType
        if (sortingType === 'string') {
          return sortingValueA
            .toLowerCase()
            .localeCompare(sortingValueB.toLowerCase())
        } else {
          return sortingValueA - sortingValueB
        }
      })
      if (sortingInfo.isReverse) {
        sortedItems = sortedItems.reverse()
      }
    }
    setSortedBodyItems(sortedItems)
  }, [sortingInfo, bodyItems])

  const sort = index => {
    setSortingInfo(prev => ({
      sortingIndex: index,
      isReverse: prev.sortingIndex !== index ? true : !prev.isReverse
    }))
  }

  return (
    <div>
      <LTHead>
        {headItems.map((item, index) => {
          const { sortingIndex, isReverse } = sortingInfo
          if (sortingIndex === -1 && item.isSortedDefault) {
            sort(index)
          }

          const sortedStatus =
            sortingIndex !== index
              ? null
              : { isSorted: true, isReverse: isReverse }

          return (
            <LTHeadItem
              width={item.width}
              isSortable={item.isSortable}
              sortedStatus={sortedStatus}
              key={index}
              onClick={item.isSortable ? () => sort(index) : null}
            >
              {item.content}
            </LTHeadItem>
          )
        })}
      </LTHead>
      <ul>
        {sortedBodyItems.map((row, index) => {
          return (
            <LTRow component={row.renderComponent} key={index}>
              {row.data.map((item, index) => {
                return (
                  <LTData width={item.width} key={index}>
                    {item.content}
                  </LTData>
                )
              })}
            </LTRow>
          )
        })}
      </ul>
    </div>
  )
}

export const LTHead = ({ children }) => {
  return <div className="ztd-student-table--header">{children}</div>
}

export const LTHeadItem = ({
  width,
  children,
  isSortable = false,
  sortedStatus,
  onClick = null
}) => (
  <div
    style={{ width }}
    className={clsx('ztd-student-table--cell', {
      'ztd-student-table--is-sortable': isSortable
    })}
    onClick={onClick}
  >
    {/* TODO! THIS NEEDS TO BE FIXED*/}

    <div className="head-item">
      {children}
      {isSortable && <SortingArrows sortedStatus={sortedStatus} />}
    </div>
  </div>
)
export const LTBody = ({ children }) => {
  return <ul>{children}</ul>
}

export const LTRow = ({
  children,
  //Rename 'component' to 'Component', and the sets the default value to be a functional react component
  component: Component = props => <a {...props}>{props.children}</a>
}) => {
  return (
    <li className="ztd-student-table--item">
      <Component className="ztd-student-table--link" href="#">
        {children}
      </Component>
    </li>
  )
}
export const LTData = ({ children, width }) => {
  return (
    <div style={{ width }} className="ztd-student-table--cell">
      {children}
    </div>
  )
}

export default ListTable
