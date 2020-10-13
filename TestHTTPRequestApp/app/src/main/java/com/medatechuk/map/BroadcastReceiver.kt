package com.medatechuk.optimax

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley

class BroadcastReceiver : BroadcastReceiver() {

    private var requestQueue: RequestQueue? = null

    override fun onReceive(context: Context?, intent: Intent?) {
        StringBuilder().apply {
            append("Action: ${intent!!.action}\n")
//            append("URI: ${intent.toUri(Intent.com.medatechuk.optimax.NEW_LOCATION)}\n")
            toString().also { log ->
                Log.d("Receiver Trigered: ", log)
                //Toast.makeText(context, log, Toast.LENGTH_LONG).show()
            }
        }
        val locationIn = intent!!.action.split("#")
        println(locationIn[0]);
        println(locationIn[1]);
        println(locationIn[2]);

        val url = "http://104.248.165.72:3000/users?service=login&username=${locationIn[2]}&password=tmp&lng=${locationIn[0]}&lat=${locationIn[1]}&updateTime=00:00&status=online"
        val queue = Volley.newRequestQueue(context)

        // Request a string response from the provided URL.
        val stringRequest = StringRequest(Request.Method.GET, url,
            Response.Listener<String> { response ->
                println(response)
            },
            Response.ErrorListener { "Error" })

        // Add the request to the RequestQueue.
        queue.add(stringRequest)
    }
}