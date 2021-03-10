/* plotting variables: */
var plot_vars = {
  /* axes data: */
  'axes': {
    'path': 'data/axes.json',
    'so2': null,
    'so2_min': null,
    'so2_max': null,
    'lat': null,
    'lat_min': null,
    'lat_max': null,
    'h': null,
    'h_min': null,
    'h_max': null
  },
  /* null data: */
  'null': {
    'jan': {
      'path': 'data/null.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    },
    'jul': {
      'path': 'data/null.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    }
  },
  /* antarctia data: */
  'antarctica': {
    'jan': {
      'path': 'data/antarctica_jan.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    },
    'jul': {
      'path': 'data/antarctica_jul.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    }
  },
  /* greenland data: */
  'greenland': {
    'jan': {
      'path': 'data/greenland_jan.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    },
    'jul': {
      'path': 'data/greenland_jul.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    }
  },
  /* forcing data: */
  'forcing': {
    'jan': {
      'path': 'data/forcing_jan.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    },
    'jul': {
      'path': 'data/forcing_jul.json',
      'mean': null,
      'sd': null,
      'so2_plot': null,
      'lat_plot': null,
      'h_plot': null,
      'mean_plot': null,
      'hover_text': null
    }
  },
  /* variable data which is required for constraining: */
  'constrain_vars': ['antarctica', 'greenland'],
  /* constrain limits: */
  'constrain_values': {
    'antarctica': {
      'slider': document.getElementById('antarctica_slider'),
      'label': document.getElementById('antarctica_slider_label'),
      'min': null,
      'max': null
    },
    'greenland': {
      'slider': document.getElementById('greenland_slider'),
      'label': document.getElementById('greenland_slider_label'),
      'min': null,
      'max': null
    }
  },
  /* months for which there is data: */
  'data_months': ['jan', 'jul'],
  /* current data type: */
  'data_type': 'null',
  /* data selection elements: */
  'data_buttons': {
    'null': document.getElementById('null_button'),
    'greenland': document.getElementById('greenland_button'),
    'antarctica': document.getElementById('antarctica_button'),
    'forcing': document.getElementById('forcing_button')
  },
  /* html plot elements: */
  'plot_divs': {
    'jan': document.getElementById('jan_plot'),
    'jul': document.getElementById('jul_plot')
  },
  /* plotly plots: */
  'plots': {
    'jan': null,
    'jul': null
  },
  /* plot styles: */
  'axes_style': {
    'x': {
      'title': 'Eruption latitude (°N)'
    },
    'y': {
      'title': 'SO₂ emission (Tg)'
    },
    'z': {
      'title': 'Injection height (km)'
    }
  },
  'month_style': {
    'jan': {
      'title': 'January eruptions'
    },
    'jul': {
      'title': 'July eruptions'
    }
  },
  'data_style': {
    'null': {
      'colorscale': 'greys',
      'cmin': 0,
      'cmax': 0,
      'showscale': false,
      'colorbar': {
        'title': '',
        'tickprefix': ''
      }
    },
    'antarctica': {
      'colorscale': [
        [0,'rgb(255,255,255)'],
        [0.3,'rgb(255,210,0)'],
        [0.6,'rgb(230,0,0)'],
        [1,'rgb(0,0,0)']
      ],
      'cmin': -5,
      'cmax': 65,
      'showscale': true,
      'colorbar': {
        'title': 'Antarctica deposition (kg SO₄ km²)',
        'tickprefix': '    '
      }
    },
    'greenland': {
      'colorscale': [
        [0,'rgb(255,255,255)'],
        [0.3,'rgb(255,210,0)'],
        [0.6,'rgb(230,0,0)'],
        [1,'rgb(0,0,0)']
      ],
      'cmin': -15,
      'cmax': 165,
      'showscale': true,
      'colorbar': {
        'title': 'Greenland deposition (kg SO₄ km²)',
        'tickprefix': '  '
      }
    },
    'forcing': {
      'colorscale': [
        [0,'rgb(0,0,0)'],
        [0.3,'rgb(230,0,0)'],
        [0.6,'rgb(255,210,0)'],
        [1,'rgb(255,255,255)']
      ],
      'cmin': -600,
      'cmax': 50,
      'showscale': true,
      'colorbar': {
        'title': 'Time-integrated RF (MJ m⁻²)',
        'tickprefix': ''
      }
    },
  },
};

/* load and return data from file using XMLHttpRequest: */
function load_json_file(file_path, callback_function, req_data) {
    /* create new request: */
    var file_req = new XMLHttpRequest();
    file_req.req_data = req_data;
    file_req.responseType = 'json';
    file_req.open('GET', file_path, true);
    /* on data load: */
    file_req.onload = callback_function;
    /* send the request: */
    file_req.send();
};

/* axes data loading function: */
function load_axes_data() {
  var axes_data = plot_vars['axes'];
  /* check if already loaded: */
  if ((axes_data['so2'] != null) &&
      (axes_data['lat'] != null) &&
      (axes_data['h'] != null)) {
    /* load variable data: */
    load_var_data();
    /* return: */
    return;
  };
  /* data load callback function: */
  var axes_callback = function(req_data) {
    /* axes_data: */
    var axes_data = plot_vars['axes'];
    /* get the response: */
    var axes_in = req_data.target.response;
    /* store the values: */
    axes_data['so2'] = axes_in['so2'];
    axes_data['lat'] = axes_in['lat'];
    axes_data['h'] = axes_in['h'];
    axes_data['so2_min'] = Math.min.apply(Math, axes_in['so2']);
    axes_data['so2_max'] = Math.max.apply(Math, axes_in['so2']);
    axes_data['lat_min'] = Math.min.apply(Math, axes_in['lat']);
    axes_data['lat_max'] = Math.max.apply(Math, axes_in['lat']);
    axes_data['h_min'] = Math.min.apply(Math, axes_in['h']);
    axes_data['h_max'] = Math.max.apply(Math, axes_in['h']);
    /* load variable data: */
    load_var_data();
  };
  /* path to the data: */
  var axes_file = axes_data['path'];
  /* load the data: */
  load_json_file(axes_file, axes_callback);
};

/* function to load data for a single month / variable: */
function load_var(all_data, data_index) {
  /* get variable / month names: */
  var data_var = all_data[data_index]['var'];
  var var_month = all_data[data_index]['month'];
  /* only plot on last value: */
  if (data_index == (all_data.length - 1)) {
    var do_plot = true;
    var next_index = null;
  } else {
    var do_plot = false;
    var next_index = data_index + 1;
  };
  /* data for this variable / month: */
  var month_data = plot_vars[data_var][var_month];
  /* check if already loaded: */
  if ((month_data['mean'] != null) &&
      (month_data['sd'] != null)) {
    /* if plotting ... : */
    if (do_plot == true) {
      /* ... plot!: */
      do_plotting();
    };
    /* if there is a next_index value: */
    if (next_index != null) {
      /* load the next variable: */
      load_var(all_data, next_index);
    };
    /* return: */
    return;
  };
  /* data load callback function: */
  var var_callback = function(req_data) {
    /* variable data: */
    var var_data = plot_vars[
      req_data.target.req_data['data_type']
    ];
    /* month data: */
    var month_data = var_data[
      req_data.target.req_data['month']
    ];
    /* get the response: */
    var var_in = req_data.target.response;
    /* store the values: */
    month_data['mean'] = var_in['mean'];
    month_data['sd'] = var_in['sd'];
    month_data['mean_plot'] = var_in['mean'].slice();
    month_data['sd_plot'] = var_in['sd'].slice();
    month_data['so2_plot'] = plot_vars['axes']['so2'].slice();
    month_data['lat_plot'] = plot_vars['axes']['lat'].slice();
    month_data['h_plot'] = plot_vars['axes']['h'].slice();
    /* if plotting ... : */
    if (req_data.target.req_data['plot'] == true) {
      /* plot!: */
      do_plotting();
    };
    /* if there is a next index: */
    if (req_data.target.req_data['next_index'] != null) {
      /* load the next variable data: */
      load_var(req_data.target.req_data['all_data'],
               req_data.target.req_data['next_index']);
    };
  };
  /* path to the data: */
  var var_file = month_data['path'];
  /* load the data: */
  load_json_file(var_file, var_callback, {
    'data_type': data_var,
    'month': var_month,
    'plot': do_plot,
    'all_data': all_data,
    'next_index': next_index
  });
};

/* variable data loading function: */
function load_var_data() {
  /* data type: */
  var data_type = plot_vars['data_type'];
  /* all variables which are required is constrain vars plus data type: */
  var data_vars = plot_vars['constrain_vars'].slice();
  data_vars.push(data_type);
  /* months for which there is data: */
  var var_months = plot_vars['data_months'];
  /* all variable / month combinations: */
  var all_data = [];
  /* loop though data types: */
  for (var i = 0, data_var; data_var = data_vars[i]; i++) {
    /* for each month: */
    for (var j = 0, var_month; var_month = var_months[j]; j++) {
      /* store values: */
      all_data.push({'var': data_var, 'month': var_month});
    };
  };
  /* start loading the data: */
  load_var(all_data, 0);
};

/* data constraining function: */
function constrain_data() {
  /* min and max constraining values: */
  var a_min = plot_vars['constrain_values']['antarctica']['min'];
  var a_max = plot_vars['constrain_values']['antarctica']['max'];
  var g_min = plot_vars['constrain_values']['greenland']['min'];
  var g_max = plot_vars['constrain_values']['greenland']['max'];
  /* if min and max values are not set, return:  */
  if ((a_min == null) || (a_max == null) ||
      (g_min == null) || (g_max == null)) {
    return;
  };
  /* axes values: */
  var x = plot_vars['axes']['lat'];
  var y = plot_vars['axes']['so2'];
  var z = plot_vars['axes']['h'];
  /* data type: */
  var data_type = plot_vars['data_type'];
  /* months for which there is data: */
  var var_months = plot_vars['data_months'];
  /* for each month: */
  for (var i = 0, var_month; var_month = var_months[i]; i++) {
    /* antarctica and greenland data: */
    var a_mean = plot_vars['antarctica'][var_month]['mean'];
    var a_sd = plot_vars['antarctica'][var_month]['sd'];
    var g_mean = plot_vars['greenland'][var_month]['mean'];
    var g_sd = plot_vars['greenland'][var_month]['sd'];
    /* data variables: */
    var mean = plot_vars[data_type][var_month]['mean'];
    /* new plotting values: */
    var mean_new = [];
    var x_new = [];
    var y_new = [];
    var z_new = [];
    /* loop through values: */
    for (j = 0; j < mean.length; j++) {
      if (((a_mean[j] + a_sd[j]) > a_min) &&
          ((a_mean[j] - a_sd[j]) < a_max) &&
          ((g_mean[j] + g_sd[j]) > g_min) &&
          ((g_mean[j] - g_sd[j]) < g_max)) {
        mean_new[j] = mean[j];
        x_new[j] = x[j];
        y_new[j] = y[j];
        z_new[j] = z[j];
      } else {
        mean_new[j] = null;
        x_new[j] = null;
        y_new[j] = null;
        z_new[j] = null;
      };
    };
    /* store the values: */
    plot_vars[data_type][var_month]['mean_plot'] = mean_new;
    plot_vars[data_type][var_month]['lat_plot'] = x_new;
    plot_vars[data_type][var_month]['so2_plot'] = y_new;
    plot_vars[data_type][var_month]['h_plot'] = z_new;
  };
};

/* slider listener adding function: */
function add_slider_listeners(slider, label, constrain_var) {
    /* change listener: */
    slider.noUiSlider.on('change', function() {
      /* get value: */
      var value = slider.noUiSlider.get();
      /* slider values: */
      var start_value = parseFloat(value[0]);
      var end_value = parseFloat(value[1]);
      /* store min and max values: */
      plot_vars['constrain_values'][constrain_var]['min'] = start_value;
      plot_vars['constrain_values'][constrain_var]['max'] = end_value;
      /* plot!: */
      plot();
    });
    /* slide listener: */
    slider.noUiSlider.on('slide', function() {
      /* get value: */
      var value = slider.noUiSlider.get();
      /* slider values: */
      var start_value = parseFloat(value[0]);
      var end_value = parseFloat(value[1]);
      /* update label: */
      label.innerHTML = start_value.toFixed(1) + ' - ' + end_value.toFixed(1) +
                        ' (kg SO₄ km²)';
    });
};

/* slider updating function: */
function update_sliders() {
  /* variables used for constraining: */
  var constrain_vars = plot_vars['constrain_vars'].slice();
  /* months for which there is data: */
  var var_months = plot_vars['data_months'];
  /* for each constraining variable ... : */
  for (var i = 0; i < constrain_vars.length; i++) {
    /* this constraining variable: */
    var constrain_var = constrain_vars[i];
    /* slider element: */
    var slider = plot_vars['constrain_values'][constrain_var]['slider'];
    /* label element: */
    var label = plot_vars['constrain_values'][constrain_var]['label'];
    /* if slider exists, return: */
    if (slider.noUiSlider != undefined) {
      return;
    };
    /* get min and max values: */
    var var_min = 999999;
    var var_max = -999999;
    for (var j = 0, var_month; var_month = var_months[j]; j++) {
      var mean_min = Math.min.apply(
        Math, plot_vars[constrain_var][var_month]['mean']
      );
      var mean_max = Math.max.apply(
        Math, plot_vars[constrain_var][var_month]['mean']
      );
      var sd_min = Math.min.apply(
        Math, plot_vars[constrain_var][var_month]['sd']
      );
      var_min = Math.min(var_min, (mean_min + sd_min));
      var_max = Math.max(var_max, (mean_max - sd_min));
    };
    /* round min and max: */
    var_min = Math.floor(var_min);
    var_max = Math.ceil(var_max);
    /* increment / step value: */
    var var_step = 0.1;
    /* create slider: */
    noUiSlider.create(slider, {
      start: [var_min, var_max],
      connect: true,
      range: {
        'min': var_min,
        'max': var_max
      },
      step: var_step,
      margin: 10 * var_step,
      tooltips: false
    });
    /* update label: */
    label.innerHTML = var_min.toFixed(1) + ' - ' + var_max.toFixed(1) +
                      ' (kg SO₄ km²)';
    /* store min and max values: */
    plot_vars['constrain_values'][constrain_var]['min'] = var_min;
    plot_vars['constrain_values'][constrain_var]['max'] = var_max;
    /* add listeners: */
    add_slider_listeners(slider, label, constrain_var);
  };
};

/* hover text updating function: */
function update_hover_text() {
  /* axes data: */
  var x_data = plot_vars['axes']['lat'];
  var y_data = plot_vars['axes']['so2'];
  var z_data = plot_vars['axes']['h'];
  /* data type: */
  var data_type = plot_vars['data_type'];
  /* months to plot: */
  var var_months = plot_vars['data_months'];
  /* for each month: */
  for (var i = 0, var_month; var_month = var_months[i]; i++) {
    /* only if hover text is null: */
    if (plot_vars[data_type][var_month]['hover_text'] != null) {
      continue;
    };
    /* data variables: */
    var mean = plot_vars[data_type][var_month]['mean'];
    var sd = plot_vars[data_type][var_month]['sd'];
    /* init array for storing text: */
    var new_text = [];
    /* loop through means and sd: */
    for (var j = 0; j < mean.length; j++) {
      /* data values: */
      var mean_value = mean[j];
      var sd_value = sd[j];
      /* create text: */
      new_text[j] = 'Latitude : ' + x_data[j] + '<br>'
                    + 'SO₂ : ' + y_data[j] + '<br>'
                    + 'Height : ' + z_data[j];
    };
    /* store the new text: */
    plot_vars[data_type][var_month]['hover_text'] = new_text;
  };
};

/* data plotting function: */
function plot_data() {
  /* data type: */
  var data_type = plot_vars['data_type'];
  /* months to plot: */
  var var_months = plot_vars['data_months'];
  /* for each month: */
  for (var i = 0, var_month; var_month = var_months[i]; i++) {
    /* axes variables: */
    var x = plot_vars[data_type][var_month]['lat_plot'];
    var x_min = plot_vars['axes']['lat_min'];
    var x_max = plot_vars['axes']['lat_max'];
    var y = plot_vars[data_type][var_month]['so2_plot'];
    var y_min = plot_vars['axes']['so2_min'];
    var y_max = plot_vars['axes']['so2_max'];
    var z = plot_vars[data_type][var_month]['h_plot'];
    var z_min = plot_vars['axes']['h_min'];
    var z_max = plot_vars['axes']['h_max'];
    /* data variables: */
    var mean = plot_vars[data_type][var_month]['mean_plot'];
    var hover_text = plot_vars[data_type][var_month]['hover_text'];
    /* style variables: */
    var axes_style = plot_vars['axes_style'];
    var month_style = plot_vars['month_style'][var_month];
    var data_style = plot_vars['data_style'][data_type];
    /* define plots: */
    var scatter_plot = {
      'type': 'scatter3d',
      'x': x,
      'y': y,
      'z': z,
      'marker': {
        'color': mean,
        'cmin': data_style['cmin'],
        'cmax': data_style['cmax'],
        'colorscale': data_style['colorscale'],
        'showscale': data_style['showscale'],
        'colorbar': {
          'title': {
            'text': data_style['colorbar']['title'],
            'font': {
              'size': 16
            }
          },
          'titleside': 'right',
          'tickprefix': data_style['colorbar']['tickprefix'],
          'tickfont': {
            'size': 14
          },
          'len': 0.7
        }
      },
      'mode': 'markers',
      'hoverinfo': 'text',
      'hoverlabel': {
        'font': {
          'size': 14
        }
      },
      'text': hover_text
    };
    var all_plots = [scatter_plot];
    /* if updating: */
    var plot_update = {
      'x': [x],
      'y': [y],
      'z': [z],
      'marker.color': [mean],
      'marker.cmin': data_style['cmin'],
      'marker.cmax': data_style['cmax'],
      'marker.colorscale': [data_style['colorscale']],
      'marker.showscale': data_style['showscale'],
      'marker.colorbar.title.text': data_style['colorbar']['title'],
      'marker.colorbar.title.font.size': 16,
      'marker.colorbar.titleside': 'right',
      'marker.colorbar.tickprefix': data_style['colorbar']['tickprefix'],
      'marker.colorbar.tickfont.size': 14,
      'text': [hover_text]
    };
    /* plot layout: */
    var plot_layout = {
      'title': {
         'text': month_style['title'],
         'font': {
           'size': 18
         }
      },
      'scene': {
        'aspectmode': 'cube',
        'xaxis': {
          'range': [x_max, x_min],
          'title': {
            'text': axes_style['x']['title'],
            'font': {
              'size': 16
            }
          },
          'zeroline': false
        },
        'yaxis': {
          'range': [y_max, y_min],
          'title': {
            'text': axes_style['y']['title'],
            'font': {
              'size': 16
            }
          },
          'zeroline': false
        },
        'zaxis': {
          'range': [z_min, z_max],
          'title': {
            'text': axes_style['z']['title'],
            'font': {
              'size': 16
            }
          },
          'zeroline': false
        },
        'camera': {
          'eye': {
            'x': 1.6,
            'y': 1.6,
            'z': 1.6
          }
        }
      },
      'margin': {
        't': 30,
        'b': 10,
        'l': 10
      }
    };
    /* plot config: */
    var plot_config = {
      'showLink': false,
      'linkText': '',
      'displaylogo': false,
      'responsive': true
    };
    /* plot div: */
    var plot_div = plot_vars['plot_divs'][var_month];
    /* create / update plot: */
    if (plot_vars['plots'][var_month] == null) {
      /* create the plot: */
      var my_plot = Plotly.newPlot(
        plot_div, all_plots, plot_layout, plot_config
      );
      plot_vars['plots'][var_month] = my_plot;
    } else {
      /* update the plot: */
      Plotly.update(plot_div, plot_update, {});
    };
  };
};

/* plotting wrapper function: */
function do_plotting() {
  /* constrain data, update sliders, update hover text and plot: */
  constrain_data();
  update_sliders();
  update_hover_text();
  plot_data();
};

/* update data type selection buttons: */
function update_plot_buttons() {
  /* data type: */
  var data_type = plot_vars['data_type'];
  /* button elements: */
  var data_buttons = plot_vars['data_buttons'];
  /* loop though buttons: */
  for (var data_button in data_buttons) {
    /* if this is current data type, disable: */
    if (data_button == data_type) {
      data_buttons[data_button].setAttribute('disabled', true);
    /* otherwise enable: */
    } else {
      data_buttons[data_button].removeAttribute('disabled');
    };
  };
};

/* main plotting function: */
function plot(data_type) {
  /* set data type or use default: */
  var data_type = data_type || plot_vars['data_type'];
  plot_vars['data_type'] = data_type;
  /* load axes data, which then loads variable data, constrains and plots: */
  load_axes_data();
  /* update plotting buttons: */
  update_plot_buttons();
};

/* on page load ... : */
window.addEventListener('load', function() {
  /* plot: */
  plot();
});
