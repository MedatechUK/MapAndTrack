package com.medatechuk.optimax

import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley

class MainActivity : AppCompatActivity() {

    private var requestQueue: RequestQueue? = null

    private var loginButton: Button? = null
    private var logoutButton: Button? = null
    private var loginUsername: EditText? = null
    private var loginPassword: EditText? = null
    private val CHANNEL_ID = "435";

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        loginUsername = findViewById(R.id.username) as EditText
        loginPassword = findViewById(R.id.password) as EditText
        loginButton = findViewById(R.id.btnLogin)
        logoutButton = findViewById(R.id.btnLogout)
        requestQueue = Volley.newRequestQueue(this)
        loginButton!!.setOnClickListener {
            var un = loginUsername!!.text.toString()
            logoutButton!!.setVisibility(View.GONE)
            login(un)
        }
        logoutButton!!.setOnClickListener {
            val intent = Intent(this, LocationService::class.java)
            val serviceIntent = Intent(this, LocationService::class.java).apply {}
            stopService(intent)
            loginButton!!.isClickable = true
            loginButton!!.setVisibility(View.VISIBLE)
            logoutButton!!.isClickable = false
            logoutButton!!.setVisibility(View.GONE)
        }
    }


    private fun login(un: String) {
        println("USERNAME IN : $un");
        var url = "http://104.248.165.72:3000/users?service=login&username=${un}&password=tmp&lng=0.0&lat=0.0&updateTime=00:00"
        val request = StringRequest(Request.Method.GET, url,
            Response.Listener<String> { response ->
                // Display the first 500 characters of the response string.
                println("RESPONSE - $response")
                val dataIn = response
                if(dataIn == "Location Updated"){
                    println("Success")
                    loginButton!!.isClickable = false
                    loginButton!!.setVisibility(View.GONE)
                    logoutButton!!.isClickable = true
                    logoutButton!!.setVisibility(View.VISIBLE)
                    startLocationService(un);
                }else {
                    println("Error")
                }
            }, Response.ErrorListener { error -> error.printStackTrace() })
        requestQueue?.add(request)
    }


    private fun startLocationService(un: String) {
        if (!isLocationServiceRunning()) {
            val intent = Intent(this, LocationService::class.java)
            val serviceIntent = Intent(this, LocationService::class.java).apply {
                putExtra("USERNAME", un)
            }
            //this.startService(serviceIntent);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                this.startForegroundService(serviceIntent)
            } else {
                startService(serviceIntent)
            }
        }
    }

    private fun isLocationServiceRunning(): Boolean {
        val manager =
            getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        for (service in manager.getRunningServices(Int.MAX_VALUE)) {
            if ("com.medatechuk.testhttprequestapp" == service.service.className) {
                Log.d(
                    "Service Status",
                    "isLocationServiceRunning: location service is already running."
                )
                return true
            }
        }
        Log.d(
            "Service Status",
            "isLocationServiceRunning: location service is not running."
        )
        return false
    }
}

