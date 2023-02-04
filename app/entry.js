'use strict'
import FDRS from '3NF_SYNTHESIS'

const FdRelationScheme = FDRS.FdRelationScheme

const R1 = new FdRelationScheme(
  'test',
  ['A', 'B', 'C', 'D', 'E'],
  [
    [['A'], ['C']],
    [['B'], ['C', 'D']],
    [['C'], ['E']],
    [['E'], ['C']],
    [['D'], ['B']]
  ]
)

const keys = R1.find_all_keys()

alert(JSON.stringify(keys.size))
