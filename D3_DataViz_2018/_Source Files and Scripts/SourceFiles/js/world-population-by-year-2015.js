!globalThis.hasOwnProperty('worldPopulation')
&& (() => {
  const worldPopulation = linesToObject(
`year,population
1950,2525149312
1951,2571867515
1952,2617940399
1953,2664029010
1954,2710677773
1955,2758314525
1956,2807246148
1957,2857662910
1958,2909651396
1959,2963216053
1960,3018343828
1961,3075073173
1962,3133554362
1963,3194075347
1964,3256988501
1965,3322495121
1966,3390685523
1967,3461343172
1968,3533966901
1969,3607865513
1970,3682487691
1971,3757734668
1972,3833594894
1973,3909722120
1974,3985733775
1975,4061399228
1976,4136542070
1977,4211322427
1978,4286282446.9999995
1979,4362189531
1980,4439632465
1981,4518602042
1982,4599003374
1983,4681210508
1984,4765657562
1985,4852540569
1986,4942056118
1987,5033804944
1988,5126632694
1989,5218978019
1990,5309667699
1991,5398328753
1992,5485115276
1993,5570045380
1994,5653315893
1995,5735123084
1996,5815392305
1997,5894155105
1998,5971882825
1999,6049205203
2000,6126622121
2001,6204310739
2002,6282301767
2003,6360764684
2004,6439842408
2005,6519635850
2006,6600220247
2007,6681607320
2008,6763732879
2009,6846479521
2010,6929725043
2011,7013427052
2012,7097500453
2013,7181715139
2014,7265785946
2015,7349472099
`);
  
  globalThis.worldPopulation = worldPopulation;
})();    