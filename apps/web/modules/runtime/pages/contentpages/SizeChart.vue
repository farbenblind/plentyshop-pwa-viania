<template>
  <div :class="classes.container">
    <h1 :class="classes.h1">Größentabelle</h1>
    
    <!-- BH's und BH Hemden -->
    <section :class="classes.section">
      <h2 :class="classes.h2">BH's und BH Hemden</h2>
      <div :class="classes.tableWrapper">
        <table :class="classes.table">
          <thead>
            <tr :class="classes.trHeader">
              <th :class="classes.thHeader" rowspan="2">Größe / Size</th>
              <th :class="classes.thHeader" rowspan="2">
                Unterbrustweite (cm)<br>
                <span :class="classes.smallText">Underbust (cm)</span>
              </th>
              <th :class="classes.thHeaderCenter" colspan="8">
                Brustumfang / Bust Width
              </th>
            </tr>
            <tr :class="classes.trSubHeader">
              <th :class="classes.thSubHeader">Cup A</th>
              <th :class="classes.thSubHeader">Cup B</th>
              <th :class="classes.thSubHeader">Cup C</th>
              <th :class="classes.thSubHeader">Cup D</th>
              <th :class="classes.thSubHeader">Cup E</th>
              <th :class="classes.thSubHeader">Cup F</th>
              <th :class="classes.thSubHeader">Cup G</th>
              <th :class="classes.thSubHeader">Cup H</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">70</td>
              <td :class="classes.td">68 - 72</td>
              <td :class="classes.tdCompact">83</td>
              <td :class="classes.tdCompact">85</td>
              <td :class="classes.tdCompact">87</td>
              <td :class="classes.tdCompact">89</td>
              <td :class="classes.tdCompact">91</td>
              <td :class="classes.tdCompact">93</td>
              <td :class="classes.tdCompact">95</td>
              <td :class="classes.tdCompact">97</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">75</td>
              <td :class="classes.td">73 - 77</td>
              <td :class="classes.tdCompact">88</td>
              <td :class="classes.tdCompact">90</td>
              <td :class="classes.tdCompact">92</td>
              <td :class="classes.tdCompact">94</td>
              <td :class="classes.tdCompact">96</td>
              <td :class="classes.tdCompact">98</td>
              <td :class="classes.tdCompact">100</td>
              <td :class="classes.tdCompact">102</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">80</td>
              <td :class="classes.td">78 - 82</td>
              <td :class="classes.tdCompact">93</td>
              <td :class="classes.tdCompact">95</td>
              <td :class="classes.tdCompact">97</td>
              <td :class="classes.tdCompact">99</td>
              <td :class="classes.tdCompact">101</td>
              <td :class="classes.tdCompact">103</td>
              <td :class="classes.tdCompact">105</td>
              <td :class="classes.tdCompact">107</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">85</td>
              <td :class="classes.td">83 - 87</td>
              <td :class="classes.tdCompact">98</td>
              <td :class="classes.tdCompact">100</td>
              <td :class="classes.tdCompact">102</td>
              <td :class="classes.tdCompact">104</td>
              <td :class="classes.tdCompact">106</td>
              <td :class="classes.tdCompact">108</td>
              <td :class="classes.tdCompact">110</td>
              <td :class="classes.tdCompact">112</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">90</td>
              <td :class="classes.td">88 - 92</td>
              <td :class="classes.tdCompact">103</td>
              <td :class="classes.tdCompact">105</td>
              <td :class="classes.tdCompact">107</td>
              <td :class="classes.tdCompact">109</td>
              <td :class="classes.tdCompact">111</td>
              <td :class="classes.tdCompact">113</td>
              <td :class="classes.tdCompact">115</td>
              <td :class="classes.tdCompact">117</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">95</td>
              <td :class="classes.td">93 - 97</td>
              <td :class="classes.tdCompact">108</td>
              <td :class="classes.tdCompact">110</td>
              <td :class="classes.tdCompact">112</td>
              <td :class="classes.tdCompact">114</td>
              <td :class="classes.tdCompact">116</td>
              <td :class="classes.tdCompact">118</td>
              <td :class="classes.tdCompact">120</td>
              <td :class="classes.tdCompact">122</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">100</td>
              <td :class="classes.td">98 - 102</td>
              <td :class="classes.tdCompact">113</td>
              <td :class="classes.tdCompact">115</td>
              <td :class="classes.tdCompact">117</td>
              <td :class="classes.tdCompact">119</td>
              <td :class="classes.tdCompact">121</td>
              <td :class="classes.tdCompact">123</td>
              <td :class="classes.tdCompact">125</td>
              <td :class="classes.tdCompact">127</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">105</td>
              <td :class="classes.td">103 - 107</td>
              <td :class="classes.tdCompact">118</td>
              <td :class="classes.tdCompact">120</td>
              <td :class="classes.tdCompact">122</td>
              <td :class="classes.tdCompact">124</td>
              <td :class="classes.tdCompact">126</td>
              <td :class="classes.tdCompact">128</td>
              <td :class="classes.tdCompact">130</td>
              <td :class="classes.tdCompact">132</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">110</td>
              <td :class="classes.td">108 - 112</td>
              <td :class="classes.tdCompact">123</td>
              <td :class="classes.tdCompact">125</td>
              <td :class="classes.tdCompact">127</td>
              <td :class="classes.tdCompact">129</td>
              <td :class="classes.tdCompact">131</td>
              <td :class="classes.tdCompact">133</td>
              <td :class="classes.tdCompact">135</td>
              <td :class="classes.tdCompact">137</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">115</td>
              <td :class="classes.td">113 - 117</td>
              <td :class="classes.tdCompact">128</td>
              <td :class="classes.tdCompact">130</td>
              <td :class="classes.tdCompact">132</td>
              <td :class="classes.tdCompact">134</td>
              <td :class="classes.tdCompact">136</td>
              <td :class="classes.tdCompact">138</td>
              <td :class="classes.tdCompact">140</td>
              <td :class="classes.tdCompact">142</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">120</td>
              <td :class="classes.td">118 - 122</td>
              <td :class="classes.tdCompact">133</td>
              <td :class="classes.tdCompact">135</td>
              <td :class="classes.tdCompact">137</td>
              <td :class="classes.tdCompact">139</td>
              <td :class="classes.tdCompact">141</td>
              <td :class="classes.tdCompact">143</td>
              <td :class="classes.tdCompact">145</td>
              <td :class="classes.tdCompact">147</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Slips, Strings, Pants -->
    <section :class="classes.section">
      <h2 :class="classes.h2">Slips, Strings, Pants</h2>
      <div :class="classes.tableWrapper">
        <table :class="classes.table">
          <thead>
            <tr :class="classes.trHeader">
              <th :class="classes.thHeader">Größe / Size (cm)</th>
              <th :class="classes.thHeaderCenter">36</th>
              <th :class="classes.thHeaderCenter">38</th>
              <th :class="classes.thHeaderCenter">40</th>
              <th :class="classes.thHeaderCenter">42</th>
              <th :class="classes.thHeaderCenter">44</th>
              <th :class="classes.thHeaderCenter">46</th>
              <th :class="classes.thHeaderCenter">48</th>
              <th :class="classes.thHeaderCenter">50</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">
                Hüftumfang<br>
                <span :class="classes.smallText">Hip Width</span>
              </td>
              <td :class="classes.tdCenter">92 - 95</td>
              <td :class="classes.tdCenter">96 - 98</td>
              <td :class="classes.tdCenter">99 - 101</td>
              <td :class="classes.tdCenter">102 - 104</td>
              <td :class="classes.tdCenter">105 - 108</td>
              <td :class="classes.tdCenter">109 - 112</td>
              <td :class="classes.tdCenter">113 - 116</td>
              <td :class="classes.tdCenter">117 - 121</td>
            </tr>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">
                Taillenumfang<br>
                <span :class="classes.smallText">Waist Width</span>
              </td>
              <td :class="classes.tdCenter">66 - 69</td>
              <td :class="classes.tdCenter">70 - 73</td>
              <td :class="classes.tdCenter">74 - 77</td>
              <td :class="classes.tdCenter">78 - 81</td>
              <td :class="classes.tdCenter">82 - 85</td>
              <td :class="classes.tdCenter">86 - 90</td>
              <td :class="classes.tdCenter">91 - 95</td>
              <td :class="classes.tdCenter">96 - 102</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Miederhosen -->
    <section :class="classes.section">
      <h2 :class="classes.h2">Miederhosen</h2>
      <div :class="classes.tableWrapper">
        <table :class="classes.table">
          <thead>
            <tr :class="classes.trHeader">
              <th :class="classes.thHeader">Größe / Size (cm)</th>
              <th :class="classes.thHeaderCenter">65</th>
              <th :class="classes.thHeaderCenter">70</th>
              <th :class="classes.thHeaderCenter">75</th>
              <th :class="classes.thHeaderCenter">80</th>
              <th :class="classes.thHeaderCenter">85</th>
              <th :class="classes.thHeaderCenter">90</th>
              <th :class="classes.thHeaderCenter">95</th>
              <th :class="classes.thHeaderCenter">100</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">
                Taillenumfang<br>
                <span :class="classes.smallText">Waist Width</span>
              </td>
              <td :class="classes.tdCenter">64 - 69</td>
              <td :class="classes.tdCenter">69 - 74</td>
              <td :class="classes.tdCenter">74 - 79</td>
              <td :class="classes.tdCenter">79 - 84</td>
              <td :class="classes.tdCenter">84 - 89</td>
              <td :class="classes.tdCenter">89 - 94</td>
              <td :class="classes.tdCenter">94 - 99</td>
              <td :class="classes.tdCenter">99 - 104</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Mund-Nasen-Schutz -->
    <section :class="classes.section">
      <h2 :class="classes.h2">Mund-Nasen-Schutz</h2>
      <div :class="classes.tableWrapper">
        <table :class="classes.table">
          <thead>
            <tr :class="classes.trHeader">
              <th :class="classes.thHeader">Größe / Size (cm)</th>
              <th :class="classes.thHeaderCenter">M</th>
              <th :class="classes.thHeaderCenter">L</th>
              <th :class="classes.thHeaderCenter">XL</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="classes.trBody">
              <td :class="classes.tdLabel">
                Kopfumfang<br>
                <span :class="classes.smallText">Von Ohr zu Ohr</span>
              </td>
              <td :class="classes.tdCenter">25 - 27</td>
              <td :class="classes.tdCenter">28 - 30</td>
              <td :class="classes.tdCenter">≥31</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
  const classes = {
    container: 'size-chart-container max-w-6xl mx-auto px-4 py-8',
    h1: 'text-3xl font-bold text-center mb-8',
    section: 'mb-12',
    h2: 'text-2xl font-semibold mb-4',
    tableWrapper: 'overflow-x-auto mr-[-20px] ml-[-20px] px-[20px] md:mx-0 md:px-0',
    table: 'w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden',
    thHeader: 'border border-gray-300 px-4 py-3 text-left font-semibold',
    thHeaderCenter: 'border border-gray-300 px-4 py-3 text-center font-semibold',
    thSubHeader: 'border border-gray-300 px-3 py-2 text-center font-medium',
    tdLabel: 'border border-gray-300 px-4 py-3 font-medium',
    td: 'border border-gray-300 px-4 py-3',
    tdCompact: 'border border-gray-300 px-3 py-3 text-center',
    tdCenter: 'border border-gray-300 px-4 py-3 text-center',
    trHeader: 'bg-gray-100',
    trSubHeader: 'bg-gray-50',
    trBody: 'hover:bg-gray-50',
    smallText: 'text-sm font-normal'
  }
</script>