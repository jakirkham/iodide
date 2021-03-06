import React from 'react'
import PropTypes from 'prop-types'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CheckCircle from 'material-ui-icons/CheckCircle'
import ErrorCircle from 'material-ui-icons/Error'
import UnloadedCircle from 'material-ui-icons/Remove'

// this is merely a presentational component, and as such can be passed
// all the data it needs.
export default class ExternalResourceOutput extends React.Component {
  static propTypes = {
    value: PropTypes.array,
  }

  render() {
    if (this.props.value === undefined) return <div />

    const outs = this.props.value.filter(d => d.src !== '').map((d) => {
      let statusExplanation
      let statusIcon
      let source = d.src.split('/')
      source = source[source.length - 1]

      const introducedVariables = (d.variables || []).map(v =>
        (
          <div
            key={`${source}-${v}`}
            style={{
                fontSize: '12px',
                borderRadius: '12px',
                padding: '3px 8px 3px 8px',
                marginRight: '6px',
                backgroundColor: 'lightgray',
                }}
          >{v}
          </div>
        ))

      if (d.status === undefined) statusIcon = <UnloadedCircle />
      else statusIcon = (d.status === 'loaded' ? <CheckCircle color="primary" /> : <ErrorCircle color="error" />)

      if (Object.prototype.hasOwnProperty.call(d, 'statusExplanation')) {
        statusExplanation = <div key={d.src} className="dependency-status-explanation">{d.statusExplanation}</div>
      }
      return (
        <div className="dependency-container" key={d.src}>
          <div className="dependency-row">
            {statusIcon}
            <div style={{ display: 'flex', flexWrap: 'wrap', lineHeight: '1.5em' }}>
              <div className="dependency-src"><a href={d.src} target="_blank">{source}</a></div>
              { introducedVariables }
            </div>

          </div>
          { statusExplanation }


        </div>
      )
    })
    return (
      <div className="dependency-output">
        {outs}
      </div>
    )
  }
}
