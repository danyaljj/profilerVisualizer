'use strict';

const React = require('react');
const Qwest = require('qwest');

var aboutGlobal = 'ABOUT TODO';
var helpGloabl = 'HELP TODO';

var role_simple_before = [
  'before', 'adjacent before', 'nearest before'
];

var role_simple_after = [
  'after', 'adjacent after', 'nearest after'
];

var role_simple_before2 = [
  'immediately before'
];
var role_simple_after2 = [
  'immediately after'
];

var role_simple_neitherBeforeAfter = [
  'same span', '', ''
];

var attributes = [ 'NER', 'Noun', 'Noun Phrase', 'Modifier', 'Verb', 'Verb Phrase', 'Entity'];

var schemaBasic = [
  ['NER at the same span', 'NER_SAME_SPAN'],
  ['NER after', 'NER_AFTER'],
  ['NER before', 'NER_BEFORE'],
  ['nearst NER before', 'NER_NEAREST_BEFORE'],
  ['nearest NER after', 'NER_NEAREST_AFTER'],
  ['adjacent NER before', 'NER_ADJACENT_BEFORE'],
  ['adjacent NER after', 'NER_ADJACENT_AFTER'],
  ['Noun Phrase before', 'NPB'],
  ['nearest Noun Phrase before ', 'NNPB'],
  ['nearest Noun Phrase after', 'NNPA'],
  ['Noun Phrase immediate after', 'NPIA'],
  ['Noun Phrase immediately before', 'NPIB'],
  ['Noun Phrase contained in', 'NPC'],
  ['Noun Phrase after', 'NPA'],
  ['Noun Phrase before', 'NNB'],
  ['nearest Noun after', 'NNA'],
  ['nearest verb before', 'NVB'],
  ['Verb Phrase after', 'NVA'],
  ['Verb Phrase before', 'VPB'],
  ['nearest Verb Phrase before', 'NVPB'],
  ['Verb Phrase immediately before', 'VPIB'],
  ['Verb Phrase immediately after', 'VPIA'],
  ['nearest Verb Phrase after', 'NVPA'],
  ['Verb Phrase after', 'VPA'],
  ['Modifier', 'MOD'],
  ['Entity before', 'EB'],
  ['Entity after', 'EA'],
  ['Pair of nearest NERs (before and after)', 'NEAREST_NER_PAIR'],
  ['Pair of nearest POSs (before and after)', 'NEAREST_POS_PAIR']
];

var schemaDep = [
  ['Dependant (with label)', 'DepWithLabels' ],
  ['Dependant Noun', 'DepN'],
  ['Dependant Noun (with label)', 'DepN_WITH_LABELS'],
  ['Dependant Noun Phrase', 'DepNP' ],
  ['Dependant Noun Phrase (with label)', 'DepNP_WITH_LABELS' ],
  ['Dependant Verb', 'DepV' ],
  ['Dependant Verb (with label)', 'DepV_WITH_LABELS' ],
  ['Dependant Verb Phrase', 'DepVP' ],
  ['Dependant Verb Phrase (with label)', 'DepVP_WITH_LABELS' ],
  ['Dependant Mention', 'DepM' ],
  ['Dependant Mention (with label)', 'DepM_WITH_LABELS' ],
  [ 'Dependant NER', 'DepNER' ],
  ['Dependant NER (with label)', 'DepNER_WITH_LABELS' ],
  ['Dependant co-referred word', 'DEP_COREF' ],
  ['Dependant co-referred word (with labels)', 'DEP_COREF_WITH_PATH_BASED_LABELS' ]
];

var tripleSchema = [
  ['triple before', 'TRIPLE_BEFORE'],
  ['triple after', 'TRIPLE_AFTER'],
  ['triple before (NER labels)', 'TRIPLE_BEFORE_NER_LABEL'],
  ['triple after (NER labels)', 'TRIPLE_AFTER_NER_LABEL'],
  ['triple before with coref between subj-subj', 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION'],
  ['triple after with coref between subj-subj', 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_NO_AGGREGATION'],
  ['triple before with coref between subj-obj', 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION'],
  ['triple after with coref between subj-obj', 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_NO_AGGREGATION'],
  ['triple before with coref between obj-subj', 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_NO_AGGREGATION'],
  ['triple after with coref between obj-subj', 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_NO_AGGREGATION'],
  ['triple before with coref between obj-obj', 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_NO_AGGREGATION'],
  ['triple after with coref between obj-obj', 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_NO_AGGREGATION'],
  ['triple before with coref between subj-subj', 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_SUBJ_OBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_OBJ_OBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_OBJ_OBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVEE_OBJ_SUBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_SUBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_NO_AGGREGATION'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVEE_OBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_SUBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_COREFED_ELEMENT'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVEE_OBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_SUBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_SUBJ_OBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_BEFORE_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_BOTH'],
  ['', 'TRIPLE_AFTER_WITH_COREF_LINK_WITH_CONNECTIVE_OBJ_OBJ_REMOVE_BOTH']
];

class ProfilerVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  panelState: 1,
                    panelContent: " ",
                    panelTitle: " ",
                    queryContent: " ",
                    queryResult: "",
                    helpContent: helpGloabl,
                    aboutContent: aboutGlobal,
                    profilerType: 0,
                    schemaType: 1,
                    surfacePlaceHolder: 'Enter a Verb',
                    labelPlaceHolder: 'Label (Verb Sense)',
                    surfaceString: '',
                    labelString: '',
                    maxItemsPerTable: 20
    };
  }

  queryHandle(queryType) {
    this.setState({ loading: true });
    console.log(this.state.surfaceString);
    console.log(this.state.labelString);

    this.setState({ loading: true });
    console.log(this.state.surfaceString);
    console.log(this.state.labelString);

    var self = this;
    Qwest.get('/api/hello', {
      surface: this.state.surfaceString,
      label: this.state.labelString,
      entityType: this.state.profilerType,
      queryType: queryType
    }, { timeout: 50000, responseType: 'json' }).then(function(response) {
          //console.log('response = ' + JSON.parse(response.text));
          self.setState({queryResult: JSON.parse(response.text)});
          //console.log('result of log : ' + self.state.queryResult);
          //console.log(this.state.loading);
      }.bind(this)
    );
  }

  ShowARowOfTable(row) {
    var rows = [];
    var self = this;
    if (Array.isArray(row)) {
      row.forEach(function (tableCell, i) {

        rows.push(
            <td key={i}>
              {tableCell}
            </td>
        );
      });
    }
    return rows;
  }

  sortMapByValue(map)
  {
    var tupleArray = [];
    for (var key in map) tupleArray.push([key, map[key]]);
    tupleArray.sort(function (a, b) { return b[1] - a[1] });
    var sortedMap = {};
    tupleArray.forEach(function(el) {  sortedMap[el[0]] = el[1] } );
    return sortedMap;
  }

  ShowATable(schemaName) {
    if ( Array.isArray(this.state.queryResult) && schemaName in this.state.queryResult[0].counts ) {
      var tableContent1 = this.state.queryResult[0].counts[schemaName];
      var tableContent = this.sortMapByValue(tableContent1);
      var resultAll =  Object.keys( tableContent );
      var countNums = resultAll.map(function(keyElement) { return tableContent[keyElement]});
      var titles = Object.keys(JSON.parse(resultAll[0]));
      var contents = [];
      for( var i = 0; i < this.state.maxItemsPerTable && i < resultAll.length; i++) {
        // console.log("i = " + i);
        var rowMap = JSON.parse(resultAll[i]);
        var oneRow = titles.map(function(titleElement) { return rowMap[titleElement] });
        oneRow.push(countNums[i]); // the frequency of the element
        contents.push( oneRow );
      }
      console.log('length of contents = ');
      console.log(contents.length);
      console.log(contents);
      titles.push("Frequency");

      var rows = [];
      var self = this;
      var title = <thead><tr key="0"> {self.ShowARowOfTable(titles)} </tr> </thead>;
      rows.push(title);

      var bodyRows = [];
      if (Array.isArray(contents)) {
        contents.forEach(function (row, i) {
          var goo = <tr key={i + 1}>{self.ShowARowOfTable(row)}</tr>;
          bodyRows.push(goo);
        });
        rows.push(<tbody>{bodyRows}</tbody>)
      }
    }
    var Table = require('react-bootstrap').Table;
    return (<Table striped bordered condensed hover>{rows}</Table> );
  }

  ShowASimpleTable(schemaName) {
    var rows = [];
    if ( Array.isArray(this.state.queryResult) && schemaName in this.state.queryResult[0].counts ) {
      var tableContent1 = this.state.queryResult[0].counts[schemaName];
      var tableContent = this.sortMapByValue(tableContent1);
      var titles = ['Attribute', 'Frequency'];

      var self = this;
      var title = <thead><tr key="0"> {self.ShowARowOfTable(titles)} </tr> </thead>;
      rows.push(title);

      var contents = Object.keys(tableContent).slice(0,this.state.maxItemsPerTable).map(function(key) { return [key, tableContent[key]] });

      console.log("Size of contents = " + contents.length);
      console.log(contents);

      var bodyRows = [];
      if (Array.isArray(contents)) {
        contents.forEach(function (row, i) {
          //console.log('Inside forEach: i = ' + i);
          var goo = <tr key={i + 1}>{self.ShowARowOfTable(row)}</tr>;
          bodyRows.push(goo);
        });
        rows.push(<tbody>{bodyRows}</tbody>)
      }
      console.log('title = ' + title);
      console.log('bodyRows = ' + bodyRows);
    }
    //rows.push(<thead> <tr> <td> 2 </td> </tr> </thead>);
    //rows.push(<tbody> <tr> <td> 1 </td> </tr> </tbody>);
    //console.log(rows);
    var Table = require('react-bootstrap').Table;
    return (<Table striped bordered condensed hover>{rows}</Table> );
  }

  handleSchemaTypeChange(key) {
    //console.log("aasdasd");
    this.setState({profilerType: key});
    //console.log(this.state.profilerType);
    this.queryView();
  }

  simpleSchema() {
    var Well = require('react-bootstrap').Well;

    return (
        <div>
          <Well>
adad
          </Well>
        </div>
      );
  }

  queryView() {
    var Button = require('react-bootstrap').Button;
    var ButtonGroup = require('react-bootstrap').ButtonGroup;
    var Navbar = require('react-bootstrap').Navbar;
    var Nav = require('react-bootstrap').Nav;
    var NavItem = require('react-bootstrap').NavItem;
    var DropdownButton = require('react-bootstrap').DropdownButton;
    var MenuItem = require('react-bootstrap').MenuItem;

    console.log('logging from the query view ');
    console.log(this.state.profilerType );

    var categories = [];
    for (var i = 0; i < schemaBasic.length; i++) {
      categories.push(<MenuItem eventKey='1'>{schemaBasic[i][0]}</MenuItem>);
    }
    if( this.state.profilerType == 1 ) { // wiki
    }
    else { // verb
      console.log('addinng the verb schemas');
      for (i = 0; i < schemaDep.length; i++) {
        categories.push(<MenuItem eventKey='1'>{schemaDep[i][0]}</MenuItem>);
      }
      for (i = 0; i < tripleSchema.length; i++) {
        categories.push(<MenuItem eventKey='1'>{tripleSchema[i][0]}</MenuItem>);
      }
    }

    var content =
        ( <div>
          <Navbar brand='Query Configuration'>
            <Nav>
              <DropdownButton eventKey={1} title='Profile Type' onSelect={this.handleSchemaTypeChange.bind(this)}>
                <MenuItem eventKey='1'>Wiki Entity</MenuItem>
                <MenuItem eventKey='2'>Verb Sense</MenuItem>
              </DropdownButton>
            </Nav>
          </Navbar>
        </div> );

    this.setState({ queryContent: content });
  }

  handleSelectPanel(key) {
    this.setState({ panelState: key });
    if( key == 1 ) {
      this.queryView();
      this.setState({ panelState: 1, panelContent: this.state.queryContent, panelTitle: 'Query'});
    }
    else if ( key == 2 ) {
      this.setState({ panelState: 2, panelContent: this.state.helpContent, panelTitle: 'Help'});
    }
    else {
      this.setState({ panelContent: this.state.aboutContent, panelTitle: 'About'});
    }
  }


  getRoleList(_role) {
    var MenuItem = require('react-bootstrap').MenuItem;
    var DropdownButton = require('react-bootstrap').DropdownButton;

    var _items = _role.map(function(role, i) {
      return ( <MenuItem>{role}</MenuItem> );
    });
    return (
        <DropdownButton bsStyle='link' title='Role' key='1'  bsSize='xsmall'>
          {_items}
        </DropdownButton>
    );
  }

  getAttributeList(_att) {
    var MenuItem = require('react-bootstrap').MenuItem;
    var DropdownButton = require('react-bootstrap').DropdownButton;
    var _items =_att.map(function(att, i) {
      return ( <MenuItem>{att}</MenuItem> );
    });
    return (
        <DropdownButton bsStyle='primary' title='Attribute' key='1'  bsSize='xsmall'>
          {_items}
        </DropdownButton>
    );
  }

  entityClicked() {
    this.setState({
      surfacePlaceHolder: 'Enter an Entity',
      labelPlaceHolder: 'Label (Wiki link)',
      profilerType: 1
    });
  }

  verbClicked() {
    this.setState({
      surfacePlaceHolder: 'Enter a Verb',
      labelPlaceHolder: 'Label (Verb Sense)',
      profilerType: 0
    });
  }

  getQueryList(self) {
    var MenuItem = require('react-bootstrap').MenuItem;
    var DropdownButton = require('react-bootstrap').DropdownButton;
    var Input = require('react-bootstrap').Input;
    var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
    var Button = require('react-bootstrap').Button;
    var ButtonGroup = require('react-bootstrap').ButtonGroup;

    return (
        <DropdownButton bsStyle='primary' title='Attribute' key='1'  bsSize='xsmall'>
          <MenuItem eventKey='1'>
            <ButtonToolbar>
              <ButtonGroup bsSize='xsmall'>
                <Button key='1' eventKey='1' onClick={this.verbClicked.bind(this)}>Verb</Button>
                <Button key='2' eventKey='2' onClick={this.entityClicked.bind(this)}>Wiki Entity</Button>
              </ButtonGroup>
            </ButtonToolbar>
            <Input type='text' className='input-sm' onChange={this.updateSurfaceHandle.bind(this)} placeholder={this.state.surfacePlaceHolder} />
            <Input type='text' className='input-sm' onChange={this.updateLabelHandle.bind(this)} placeholder={this.state.labelPlaceHolder} />
          </MenuItem>
        </DropdownButton>
    );
  }

  updateSurfaceHandle(e) {
    this.setState({surfaceString: e.target.value});
  }

  updateLabelHandle(e) {
    this.setState({labelString: e.target.value});
  }

  render() {
    var Button = require('react-bootstrap').Button;
    var ButtonGroup = require('react-bootstrap').ButtonGroup;
    var TabPane = require('react-bootstrap').TabPane;
    var TabbedArea = require('react-bootstrap').TabbedArea;
    var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
    var SplitButton = require('react-bootstrap').SplitButton;
    var MenuItem = require('react-bootstrap').MenuItem;
    var PageHeader = require('react-bootstrap').PageHeader;
    var Panel = require('react-bootstrap').Panel;
    var DropdownButton = require('react-bootstrap').DropdownButton;
    var Input = require('react-bootstrap').Input;

    return (
      <div id="mainDiv">
        <PageHeader><h1>     Profiler <small>Knowledge Schemas at Scale!</small></h1></PageHeader>
        <main className="text-center padded">
          <section>
            <TabbedArea defaultActiveKey={this.state.panelState} onSelect={this.handleSelectPanel.bind(this)}>
              <TabPane eventKey={1} tab='Query'>  </TabPane>
              <TabPane eventKey={2} tab='Help'>  </TabPane>
              <TabPane eventKey={3} tab='About'>  </TabPane>
            </TabbedArea>

            <div>
              <Panel header={this.state.panelTitle}>
                {this.state.panelContent}
              </Panel>
            </div>

            {this.simpleSchema()}

            <Panel>
              <div className="tree">
                <ul>
                  <li>
                  <span className="so-label" >
                    {this.getRoleList(role_simple_before)}
                  </span>
                    {this.getAttributeList(attributes)}
                  </li>
                  <li>
                    {this.getQueryList()}
                  </li>
                </ul>
              </div>
              <Button bsStyle="success" bsSize="small" onClick={this.queryHandle.bind(this, 1)}>
                Query
              </Button>

              <h1> DepN  </h1>
              {this.ShowASimpleTable('DepN')}
              <h1> DepNER  </h1>
              {this.ShowASimpleTable('DepNER')}
              <h1> DepV  </h1>
              {this.ShowASimpleTable('DepV')}
              <h1> DepLabel  </h1>
              {this.ShowATable('DepLabel')}
              <h1> DepNER_WITH_LABELS  </h1>
              {this.ShowATable('DepNER_WITH_LABELS')}
              <h1> DepN_WITH_LABELS  </h1>
              {this.ShowATable('DepN_WITH_LABELS')}
              <h1> DepV_WITH_LABELS  </h1>
              {this.ShowATable('DepV_WITH_LABELS')}
            </Panel>


            <Panel>
              <div className="tree">
                <ul>
                  <li>
                    <span className="so-label" >
                      {this.getRoleList(role_simple_before)}
                    </span>
                    {this.getAttributeList(attributes)}
                  </li>
                  <li>
                    {this.getQueryList()}
                  </li>
                </ul>
              </div>
              <Button bsStyle="success" bsSize="small" onClick={this.queryHandle.bind(this, 0)}>
                Query
              </Button>

              <h1>Nearest Noun After </h1>
              {this.ShowASimpleTable('NNA')}
              <h1> NER_AFTER1  </h1>
              {this.ShowASimpleTable('NER_AFTER')}
              <h1> Entity After </h1>
              {this.ShowATable('EA')};
              <h1> Entity Before </h1>
              {this.ShowATable('EB')};
            </Panel>

          </section>
        </main>
      </div>
    );
  }
}

React.render(<ProfilerVisualizer />, document.body);
